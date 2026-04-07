import React, { useEffect, useRef, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { Upload, RotateCw, X } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { RiskType } from '@/types'
import { IconRenderer } from '@/components/icons'
import { cn } from '@/lib/utils'
import { SignageIcon } from '@/components/ui/signage-icon'

const ICON_CATEGORIES = {
  'Condições da Via': [
    'CornerUpLeft',
    'CornerUpRight',
    'Plus',
    'Shrink',
    'Activity',
    'ChevronUp',
    'ChevronDown',
    'Mountain',
    'TrendingUp',
    'TrendingDown',
    'GitMerge',
    'RotateCw',
    'Waves',
    'Merge',
    'Split',
    'ArrowUpLeft',
    'ArrowUpRight',
    'ArrowRight',
    'ArrowLeft',
  ],
  Situações: [
    'HardHat',
    'Bike',
    'User',
    'GraduationCap',
    'Tractor',
    'Dog',
    'Rabbit',
    'Bird',
    'Droplets',
    'Cat',
    'Snail',
    'PawPrint',
    'Bug',
  ],
  'Avaliação / Serviços / Clima': [
    'Signal',
    'SignalMedium',
    'SignalLow',
    'SignalZero',
    'WifiOff',
    'Ban',
    'XCircle',
    'Fuel',
    'ShieldAlert',
    'Camera',
    'Cctv',
    'Sun',
    'Moon',
    'CloudRain',
    'CloudFog',
    'Cloud',
    'Snowflake',
    'Wind',
  ],
  Outros: [
    'TriangleAlert',
    'Octagon',
    'Cone',
    'CarFront',
    'Truck',
    'AlertCircle',
    'Signpost',
    'Map',
    'MapPin',
    'Anchor',
    'TrainTrack',
    'TrainFront',
    'BusFront',
    'Construction',
    'Wrench',
    'Hammer',
    'Barrier',
    'Flag',
    'Milestone',
    'Eye',
    'EyeOff',
    'Volume2',
    'VolumeX',
    'Zap',
    'Power',
    'BatteryWarning',
    'Flame',
    'ThumbsDown',
    'MinusCircle',
    'HelpCircle',
    'Info',
    'MessageCircleWarning',
    'RadioTower',
    'PhoneOff',
    'Route',
    'Waypoints',
    'ArrowRightToLine',
    'Car',
    'CarTaxiFront',
    'Bus',
    'Plane',
    'Ship',
    'Shuffle',
    'Building',
    'Split',
    'ZapOff',
    'Eraser',
    'ArrowLeftRight',
    'Bridge',
    'Building2',
  ],
}

const riskSchema = z
  .object({
    name: z.string().min(1, 'O nome é obrigatório'),
    iconName: z.string(),
    customIconUrl: z.string().optional(),
    category: z.string().optional(),
    description: z.string().optional(),
    baseWeight: z.coerce.number().min(1).max(4, 'O peso deve ser de 1 a 4'),
    roadContexts: z
      .array(z.enum(['urbana', 'rodoviaria']))
      .min(1, 'Selecione pelo menos um contexto'),
  })
  .refine((data) => data.iconName || data.customIconUrl, {
    message: 'Selecione um ícone ou faça upload de uma imagem',
    path: ['iconName'],
  })

type RiskFormValues = z.infer<typeof riskSchema>

interface RiskFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  risk?: RiskType | null
  onSave: (data: Omit<RiskType, 'id'>) => void
}

export function RiskFormDialog({ open, onOpenChange, risk, onSave }: RiskFormDialogProps) {
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<RiskFormValues>({
    resolver: zodResolver(riskSchema),
    defaultValues: {
      name: '',
      iconName: 'TriangleAlert',
      customIconUrl: undefined,
      category: '',
      description: '',
      baseWeight: 1,
    },
  })

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setIsUploading(true)
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
      const filePath = `icons/${fileName}`

      const { error: uploadError } = await supabase.storage.from('images').upload(filePath, file)

      if (uploadError) throw uploadError

      const { data } = supabase.storage.from('images').getPublicUrl(filePath)

      form.setValue('customIconUrl', data.publicUrl)
      form.setValue('iconName', '')
    } catch (error) {
      console.error('Error uploading image:', error)
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  useEffect(() => {
    if (open) {
      if (risk) {
        form.reset({
          name: risk.name,
          iconName: risk.iconName || 'TriangleAlert',
          customIconUrl: risk.customIconUrl,
          category: risk.category || '',
          description: risk.description || '',
          baseWeight: risk.baseWeight,
          roadContexts:
            risk.roadContexts || (risk.roadContext ? [risk.roadContext] : ['rodoviaria']),
        })
      } else {
        form.reset({
          name: '',
          iconName: 'TriangleAlert',
          customIconUrl: undefined,
          category: '',
          description: '',
          baseWeight: 1,
          roadContexts: ['urbana', 'rodoviaria'],
        })
      }
    }
  }, [open, risk, form])

  const handleSubmit = (values: RiskFormValues) => {
    onSave({
      ...values,
      roadContext: values.roadContexts[0], // fallback for legacy code
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{risk ? 'Editar Risco' : 'Novo Risco'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 flex justify-center py-6 bg-slate-50 border rounded-md relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
                <div className="text-center flex flex-col items-center relative z-10">
                  <span className="text-xs font-bold text-slate-500 uppercase mb-4 tracking-wider">
                    Pré-visualização
                  </span>
                  <SignageIcon
                    iconName={form.watch('iconName')}
                    customIconUrl={form.watch('customIconUrl')}
                    className="w-20 h-20"
                  />
                </div>
              </div>

              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Nome do Risco</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Curva fechada" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="iconName"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <div className="flex items-center justify-between mb-2">
                      <FormLabel>Ícone (Sinalização)</FormLabel>
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          ref={fileInputRef}
                          onChange={handleFileUpload}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="h-7 text-xs bg-slate-50"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={isUploading}
                        >
                          {isUploading ? (
                            <span className="flex items-center">
                              <RotateCw className="w-3 h-3 mr-1 animate-spin" /> Enviando...
                            </span>
                          ) : (
                            <span className="flex items-center">
                              <Upload className="w-3 h-3 mr-1" /> Upload de Imagem
                            </span>
                          )}
                        </Button>
                      </div>
                    </div>

                    {form.watch('customIconUrl') ? (
                      <div className="p-3 bg-slate-50 border border-slate-200 rounded-md flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 border bg-white rounded flex items-center justify-center p-1 shadow-sm">
                            <img
                              src={form.watch('customIconUrl')}
                              alt="Custom"
                              className="max-w-full max-h-full object-contain"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-700">
                              Imagem Personalizada em uso
                            </p>
                            <p className="text-xs text-slate-500">
                              Substitui os ícones da biblioteca.
                            </p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => {
                            form.setValue('customIconUrl', undefined)
                            form.setValue('iconName', 'TriangleAlert')
                          }}
                        >
                          <X className="w-4 h-4 mr-1" /> Remover
                        </Button>
                      </div>
                    ) : (
                      <div className="w-full max-h-[220px] overflow-y-auto p-3 border rounded-md bg-slate-50 space-y-5">
                        {Object.entries(ICON_CATEGORIES).map(([category, icons]) => (
                          <div key={category}>
                            <h4 className="text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-wider">
                              {category}
                            </h4>
                            <div className="grid grid-cols-6 sm:grid-cols-8 gap-2">
                              {icons.map((icon) => (
                                <div
                                  key={icon}
                                  className={cn(
                                    'p-2 border rounded-md cursor-pointer flex items-center justify-center transition-colors',
                                    field.value === icon
                                      ? 'bg-yellow-100 border-yellow-500 text-yellow-700 shadow-sm'
                                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100 hover:border-slate-300',
                                  )}
                                  onClick={() => {
                                    field.onChange(icon)
                                  }}
                                  title={icon}
                                >
                                  <IconRenderer name={icon} className="w-5 h-5" />
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="roadContexts"
                control={form.control}
                render={() => (
                  <FormItem className="col-span-2">
                    <div className="mb-2">
                      <FormLabel>Contexto da Via</FormLabel>
                    </div>
                    <div className="flex gap-4">
                      <FormField
                        control={form.control}
                        name="roadContexts"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes('urbana')}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...(field.value || []), 'urbana'])
                                    : field.onChange(
                                        field.value?.filter((value) => value !== 'urbana'),
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">Via Urbana</FormLabel>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="roadContexts"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes('rodoviaria')}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...(field.value || []), 'rodoviaria'])
                                    : field.onChange(
                                        field.value?.filter((value) => value !== 'rodoviaria'),
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              Via Rodoviária
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="category"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel>Categoria</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Via" {...field} value={field.value || ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="baseWeight"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel>Nível de Risco</FormLabel>
                    <Select
                      onValueChange={(v) => field.onChange(Number(v))}
                      value={String(field.value)}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">Baixo (0-15 pts)</SelectItem>
                        <SelectItem value="2">Médio (16-30 pts)</SelectItem>
                        <SelectItem value="3">Alto (31-50 pts)</SelectItem>
                        <SelectItem value="4">Crítico (&gt; 50 pts)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Detalhes adicionais..."
                        {...field}
                        value={field.value || ''}
                        className="resize-none h-20"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit">Salvar Risco</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
