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
  const [photoUrl, setPhotoUrl] = useState('')
  const [audioUrl, setAudioUrl] = useState('')
  const [isRecording, setIsRecording] = useState(false)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const event = state.events.find((e: any) => e.id === eventId)

  useEffect(() => {
    if (event) {
      setNote(event.note || '')
      setPhotoUrl(event.photoUrl || '')
      setAudioUrl(event.audioUrl || '')
    } else {
      setNote('')
      setPhotoUrl('')
      setAudioUrl('')
    }
  }, [event])

  const handlePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const toggleRecording = async () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop()
      setIsRecording(false)
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        const recorder = new MediaRecorder(stream)
        const chunks: Blob[] = []
        recorder.ondataavailable = (e) => chunks.push(e.data)
        recorder.onstop = () => {
          const blob = new Blob(chunks, { type: 'audio/webm' })
          const reader = new FileReader()
          reader.onloadend = () => {
            setAudioUrl(reader.result as string)
          }
          reader.readAsDataURL(blob)
          stream.getTracks().forEach((t) => t.stop())
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
        updateEvent(eventId, { note, photoUrl, audioUrl, synced: false })
      } else if (event) {
        event.note = note
        event.photoUrl = photoUrl
        event.audioUrl = audioUrl
        event.synced = false
      }
      toast({ title: 'Evidências salvas com sucesso!' })
    }
    onClose()
  }

  return (
    <Drawer open={!!eventId} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="bg-white">
        <DrawerHeader>
          <DrawerTitle>{riskName}</DrawerTitle>
          <DrawerDescription>Adicione evidências e observações para este risco.</DrawerDescription>
        </DrawerHeader>

        <div className="p-4 space-y-4">
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
              className="flex-1 h-12 flex flex-col gap-1 items-center justify-center relative overflow-hidden"
              onClick={() => fileInputRef.current?.click()}
            >
              <Camera className="w-5 h-5 text-slate-600" />
              <span className="text-[10px] font-medium text-slate-500">
                {photoUrl ? 'Trocar Foto' : 'Tirar Foto'}
              </span>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                className="absolute inset-0 opacity-0 cursor-pointer hidden"
                ref={fileInputRef}
                onChange={handlePhotoCapture}
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

          {photoUrl && (
            <div className="relative mt-2 rounded-lg overflow-hidden border border-slate-200">
              <img
                src={photoUrl}
                alt="Evidência fotográfica"
                className="w-full h-32 object-cover"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8 rounded-full"
                onClick={() => setPhotoUrl('')}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
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

        <DrawerFooter className="pt-2 pb-6">
          <Button onClick={handleSave} className="w-full h-12 font-bold text-base">
            <Save className="w-4 h-4 mr-2" /> Salvar Informações
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
