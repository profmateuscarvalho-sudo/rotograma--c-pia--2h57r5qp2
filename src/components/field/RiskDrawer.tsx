import React, { useState, useEffect, useRef } from 'react'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Camera, Mic, Square, Trash2, Save } from 'lucide-react'
import { useAppStore } from '@/store/AppContext'
import { useToast } from '@/hooks/use-toast'

interface RiskDrawerProps {
  eventId: string | null
  riskName: string
  onClose: () => void
}

export function RiskDrawer({ eventId, riskName, onClose }: RiskDrawerProps) {
  const { state, updateEvent } = useAppStore() as any
  const { toast } = useToast()

  const [note, setNote] = useState('')
  const [photoUrls, setPhotoUrls] = useState<string[]>([])
  const [audioUrl, setAudioUrl] = useState('')
  const [isRecording, setIsRecording] = useState(false)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const event = state.events.find((e: any) => e.id === eventId)

  useEffect(() => {
    if (event) {
      setNote(event.note || '')
      setPhotoUrls(
        event.photoUrls?.length ? event.photoUrls : event.photoUrl ? [event.photoUrl] : [],
      )
      setAudioUrl(event.audioUrl || '')
    } else {
      setNote('')
      setPhotoUrls([])
      setAudioUrl('')
    }
  }, [event])

  const handlePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && photoUrls.length < 5) {
      const url = URL.createObjectURL(file)
      setPhotoUrls((prev) => [...prev, url])
    }
  }

  const removePhoto = (index: number) => {
    setPhotoUrls((prev) => prev.filter((_, i) => i !== index))
  }

  const toggleRecording = async () => {
    if (isRecording) {
      try {
        mediaRecorderRef.current?.stop()
      } catch (e) {
        console.error(e)
      }
      setIsRecording(false)
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        const recorder = new MediaRecorder(stream)
        const chunks: Blob[] = []
        recorder.ondataavailable = (e) => chunks.push(e.data)
        recorder.onstop = () => {
          try {
            const blob = new Blob(chunks, { type: 'audio/webm' })
            const url = URL.createObjectURL(blob)
            setAudioUrl(url)
            stream.getTracks().forEach((t) => t.stop())
          } catch (e) {
            console.error('Error processing audio', e)
          }
        }
        recorder.start()
        mediaRecorderRef.current = recorder
        setIsRecording(true)
      } catch (err) {
        toast({ title: 'Microfone indisponível', variant: 'destructive' })
      }
    }
  }

  const handleSave = () => {
    if (eventId) {
      if (updateEvent) {
        updateEvent(eventId, {
          note,
          photoUrl: photoUrls[0] || '',
          photoUrls,
          audioUrl,
          synced: false,
        })
      } else if (event) {
        event.note = note
        event.photoUrl = photoUrls[0] || ''
        event.photoUrls = photoUrls
        event.audioUrl = audioUrl
        event.synced = false
      }
      toast({ title: 'Evidências salvas com sucesso!' })
    }
    onClose()
  }

  return (
    <Drawer open={!!eventId} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="bg-white flex flex-col max-h-[92vh]">
        <DrawerHeader className="shrink-0">
          <DrawerTitle>{riskName}</DrawerTitle>
          <DrawerDescription>Adicione evidências e observações para este risco.</DrawerDescription>
        </DrawerHeader>

        <div className="p-4 space-y-4 overflow-y-auto flex-1 min-h-0">
          <div className="space-y-2">
            <label className="text-sm font-semibold">Observação</label>
            <Textarea
              placeholder="Descreva os detalhes do risco..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="resize-none h-20"
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1 h-12 flex flex-col gap-1 items-center justify-center relative overflow-hidden disabled:opacity-50"
              onClick={() => fileInputRef.current?.click()}
              disabled={photoUrls.length >= 5}
            >
              <Camera className="w-5 h-5 text-slate-600" />
              <span className="text-[10px] font-medium text-slate-500">
                {photoUrls.length >= 5 ? 'Limite (5/5)' : `Tirar Foto (${photoUrls.length}/5)`}
              </span>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                className="absolute inset-0 opacity-0 cursor-pointer hidden"
                ref={fileInputRef}
                onChange={handlePhotoCapture}
                disabled={photoUrls.length >= 5}
              />
            </Button>

            <Button
              variant={isRecording ? 'destructive' : 'outline'}
              className="flex-1 h-12 flex flex-col gap-1 items-center justify-center"
              onClick={toggleRecording}
            >
              {isRecording ? (
                <Square className="w-5 h-5" />
              ) : (
                <Mic className="w-5 h-5 text-slate-600" />
              )}
              <span className="text-[10px] font-medium text-slate-500">
                {isRecording ? 'Parar Gravação' : audioUrl ? 'Regravar Áudio' : 'Gravar Áudio'}
              </span>
            </Button>
          </div>

          {photoUrls.length > 0 && (
            <div className="mt-2 grid grid-cols-2 gap-2">
              {photoUrls.map((url, i) => (
                <div
                  key={i}
                  className="relative rounded-lg overflow-hidden border border-slate-200 aspect-square"
                >
                  <img
                    src={url}
                    alt={`Evidência ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-1 right-1 h-6 w-6 rounded-full"
                    onClick={() => removePhoto(i)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {audioUrl && !isRecording && (
            <div className="mt-2 flex items-center gap-2 bg-slate-50 p-2 rounded-lg border border-slate-200">
              <audio src={audioUrl} controls className="flex-1 h-8" />
              <Button
                variant="ghost"
                size="icon"
                className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8 shrink-0"
                onClick={() => setAudioUrl('')}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        <DrawerFooter className="pt-2 pb-6 shrink-0 border-t border-slate-100 bg-white shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)] mt-2">
          <Button onClick={handleSave} className="w-full h-12 font-bold text-base">
            <Save className="w-4 h-4 mr-2" /> Salvar Informações
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
