import { RiskType } from '@/types'

export const DEFAULT_CATALOG: RiskType[] = [
  // Condições
  {
    id: '1',
    name: 'Curva acentuada à esquerda',
    iconName: 'CornerUpLeft',
    baseWeight: 4,
    category: 'Condições',
  },
  {
    id: '2',
    name: 'Curva acentuada à direita',
    iconName: 'CornerUpRight',
    baseWeight: 4,
    category: 'Condições',
  },
  { id: '3', name: 'Cruzamento de vias', iconName: 'Plus', baseWeight: 4, category: 'Condições' },
  { id: '4', name: 'Ponte estreita', iconName: 'Shrink', baseWeight: 3, category: 'Condições' },
  { id: '5', name: 'Pista irregular', iconName: 'Activity', baseWeight: 3, category: 'Condições' },
  {
    id: '6',
    name: 'Saliência ou lombada',
    iconName: 'ArrowUp',
    baseWeight: 3,
    category: 'Condições',
  },
  {
    id: '7',
    name: 'Área com desmoronamento',
    iconName: 'Mountain',
    baseWeight: 4,
    category: 'Condições',
  },
  {
    id: '8',
    name: 'Declive acentuado',
    iconName: 'TrendingDown',
    baseWeight: 3,
    category: 'Condições',
  },
  {
    id: '9',
    name: 'Aclive acentuado',
    iconName: 'TrendingUp',
    baseWeight: 3,
    category: 'Condições',
  },
  {
    id: '10',
    name: 'Confluência à esquerda',
    iconName: 'ArrowUpLeft',
    baseWeight: 3,
    category: 'Condições',
  },
  {
    id: '11',
    name: 'Confluência à direita',
    iconName: 'ArrowUpRight',
    baseWeight: 3,
    category: 'Condições',
  },
  {
    id: '12',
    name: 'Interseção em círculo',
    iconName: 'RefreshCw',
    baseWeight: 3,
    category: 'Condições',
  },
  { id: '13', name: 'Depressão', iconName: 'ArrowDown', baseWeight: 3, category: 'Condições' },

  // Situações
  { id: '14', name: 'Obras', iconName: 'HardHat', baseWeight: 3, category: 'Situações' },
  { id: '15', name: 'Ciclistas', iconName: 'Bike', baseWeight: 3, category: 'Situações' },
  {
    id: '16',
    name: 'Passagem de pedestres',
    iconName: 'User',
    baseWeight: 3,
    category: 'Situações',
  },
  {
    id: '17',
    name: 'Área escolar',
    iconName: 'GraduationCap',
    baseWeight: 3,
    category: 'Situações',
  },
  {
    id: '18',
    name: 'Maquinaria agrícola',
    iconName: 'Tractor',
    baseWeight: 3,
    category: 'Situações',
  },
  { id: '19', name: 'Cuidado animais', iconName: 'Dog', baseWeight: 3, category: 'Situações' },
  { id: '20', name: 'Animais selvagens', iconName: 'Rabbit', baseWeight: 4, category: 'Situações' },
  { id: '21', name: 'Pista escorregadia', iconName: 'Waves', baseWeight: 4, category: 'Situações' },

  // Avaliação trecho
  {
    id: '22',
    name: 'Sinal celular',
    iconName: 'Signal',
    baseWeight: 1,
    category: 'Avaliação trecho',
  },
  {
    id: '23',
    name: 'Sinalização',
    iconName: 'Signpost',
    baseWeight: 2,
    category: 'Avaliação trecho',
  },
  { id: '24', name: 'Posto', iconName: 'Fuel', baseWeight: 1, category: 'Avaliação trecho' },
  {
    id: '25',
    name: 'Polícia',
    iconName: 'ShieldAlert',
    baseWeight: 1,
    category: 'Avaliação trecho',
  },
  { id: '26', name: 'Radar', iconName: 'Camera', baseWeight: 2, category: 'Avaliação trecho' },
  { id: '27', name: 'Sol', iconName: 'Sun', baseWeight: 1, category: 'Avaliação trecho' },
  { id: '28', name: 'Lua', iconName: 'Moon', baseWeight: 1, category: 'Avaliação trecho' },
  { id: '29', name: 'Chuva', iconName: 'CloudRain', baseWeight: 3, category: 'Avaliação trecho' },
  { id: '30', name: 'Neblina', iconName: 'CloudFog', baseWeight: 4, category: 'Avaliação trecho' },
]

export const LEVEL_THRESHOLDS = {
  BAIXO: 15,
  MEDIO: 30,
  ALTO: 50,
}

export const ROUTE_LEVEL_THRESHOLDS = {
  BAIXO: 15,
  MEDIO: 30,
  ALTO: 50,
}
