import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '@/store/AppContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Route, Segment } from '@/types'

export default function NewRoute() {
  const navigate = useNavigate()
  const { addRoute } = useAppStore()
  const [formData, setFormData] = useState({
    name: '',
    origin: '',
    destination: '',
    evaluator: '',
    totalKm: '100',
    segmentCount: '10',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const routeId = crypto.randomUUID()
    const totalKm = parseFloat(formData.totalKm) || 100
    const count = parseInt(formData.segmentCount) || 10
    const kmPerSegment = totalKm / count

    const newRoute: Route = {
      id: routeId,
      name: formData.name,
      origin: formData.origin,
      destination: formData.destination,
      evaluator: formData.evaluator,
      kmPerSegment,
      status: 'em_andamento',
      date: new Date().toISOString(),
    }

    const segments: Segment[] = Array.from({ length: count }).map(
      (_, i) =>
        ({
          id: crypto.randomUUID(),
          routeId,
          number: i + 1,
          startKm: Number((i * kmPerSegment).toFixed(2)),
          endKm: Number(((i + 1) * kmPerSegment).toFixed(2)),
          synced: false,
        }) as any,
    )

    addRoute(newRoute, segments)
    navigate(`/routes/${routeId}/field`)
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in-up">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Nova Rota de Levantamento</CardTitle>
          <CardDescription>
            Configure os dados da viagem antes de iniciar o rotograma.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome da Rota</Label>
              <Input
                id="name"
                required
                placeholder="Ex: BR-116 Trecho Sul"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="origin">Origem</Label>
                <Input
                  id="origin"
                  required
                  placeholder="Cidade A"
                  value={formData.origin}
                  onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="destination">Destino</Label>
                <Input
                  id="destination"
                  required
                  placeholder="Cidade B"
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="evaluator">Nome do Avaliador</Label>
              <Input
                id="evaluator"
                required
                placeholder="Ex: Ana Silva"
                value={formData.evaluator}
                onChange={(e) => setFormData({ ...formData, evaluator: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 pb-4">
              <div className="space-y-2">
                <Label htmlFor="totalKm">KM Total da Rota</Label>
                <Input
                  id="totalKm"
                  type="number"
                  min="1"
                  step="0.1"
                  required
                  value={formData.totalKm}
                  onChange={(e) => setFormData({ ...formData, totalKm: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="segmentCount">Qtd. de Trechos</Label>
                <Input
                  id="segmentCount"
                  type="number"
                  min="1"
                  required
                  value={formData.segmentCount}
                  onChange={(e) => setFormData({ ...formData, segmentCount: e.target.value })}
                />
              </div>
            </div>
            <div className="text-sm text-muted-foreground bg-slate-50 p-3 rounded-lg border border-slate-100 mb-4">
              O sistema gerará automaticamente{' '}
              <strong className="text-slate-800">{formData.segmentCount || 0} trechos</strong> com
              aproximadamente{' '}
              <strong className="text-slate-800">
                {(
                  (parseFloat(formData.totalKm) || 0) / (parseInt(formData.segmentCount) || 1)
                ).toFixed(2)}{' '}
                km
              </strong>{' '}
              cada.
            </div>

            <Button type="submit" className="w-full h-12 text-lg">
              Iniciar Levantamento
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
