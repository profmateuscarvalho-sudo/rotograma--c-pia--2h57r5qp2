import React, { useEffect } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
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

const ICONS = [
  'TriangleAlert',
  'Octagon',
  'Cone',
  'CarFront',
  'Truck',
  'Bike',
  'AlertCircle',
  'Bird',
  'CloudRain',
  'CloudFog',
  'TrendingUp',
  'TrendingDown',
  'Crosshair',
  'CircleDashed',
  'ShieldAlert',
  'Signpost',
  'Map',
  'Navigation',
  'MapPin',
  'Compass',
  'Waves',
  'Droplets',
  'Wind',
  'Snowflake',
  'Sun',
  'Moon',
  'Thermometer',
  'Activity',
  'Anchor',
  'TrainTrack',
  'TrainFront',
  'BusFront',
  'Tractor',
  'Construction',
  'Wrench',
  'Hammer',
  'HardHat',
  'Barrier',
  'Flag',
  'Milestone',
  'Camera',
  'Cctv',
  'Video',
  'Eye',
  'EyeOff',
  'Volume2',
  'VolumeX',
  'Zap',
  'Power',
  'BatteryWarning',
  'Fuel',
  'Flame',
  'ThumbsDown',
  'XCircle',
  'MinusCircle',
  'Minus',
  'HelpCircle',
  'Info',
  'MessageCircleWarning',
  'RadioTower',
  'WifiOff',
  'Signal',
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
  'User',

  // Newly added for comprehensive traffic signage
  'CornerUpRight',
  'Split',
  'ZapOff',
  'Dog',
  'Ban',
  'Eraser',
  'Cloud',
  'ArrowLeftRight',
  'Shrink',
  'Bridge',
  'Building2',
  'GraduationCap',
  'SignalLow',
]

const riskSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  iconName: z.string().min(1, 'Selecione um ícone'),
  category: z.string().optional(),
  description: z.string().optional(),
  baseWeight: z.coerce.number().min(1).max(4, 'O peso deve ser de 1 a 4'),
  roadContexts: z
    .array(z.enum(['urbana', 'rodoviaria']))
    .min(1, 'Selecione pelo menos um contexto'),
})

type RiskFormValues = z.infer<typeof riskSchema>

interface RiskFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  risk?: RiskType | null
  onSave: (data: Omit<RiskType, 'id'>) => void
}

export function RiskFormDialog({ open, onOpenChange, risk, onSave }: RiskFormDialogProps) {
  const form = useForm<RiskFormValues>({
    resolver: zodResolver(riskSchema),
    defaultValues: {
      name: '',
      iconName: 'TriangleAlert',
      category: '',
      description: '',
      baseWeight: 1,
    },
  })

  useEffect(() => {
    if (open) {
      if (risk) {
        form.reset({
          name: risk.name,
          iconName: risk.iconName || 'TriangleAlert',
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
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>{risk ? 'Editar Risco' : 'Novo Risco'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
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
                    <FormLabel>Ícone</FormLabel>
                    <div className="grid grid-cols-7 gap-2 max-h-40 overflow-y-auto p-1 border rounded-md bg-slate-50">
                      {ICONS.map((icon) => (
                        <div
                          key={icon}
                          className={cn(
                            'p-2 border rounded-md cursor-pointer flex items-center justify-center transition-colors',
                            field.value === icon
                              ? 'bg-blue-100 border-blue-500 text-blue-600 shadow-sm'
                              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100',
                          )}
                          onClick={() => field.onChange(icon)}
                          title={icon}
                        >
                          <IconRenderer name={icon} className="w-5 h-5" />
                        </div>
                      ))}
                    </div>
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
                    <FormLabel>Peso (1 a 4)</FormLabel>
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
                        {[1, 2, 3, 4].map((n) => (
                          <SelectItem key={n} value={String(n)}>
                            {n}
                          </SelectItem>
                        ))}
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
