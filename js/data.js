// EVIDÊNCIAS (7)
const EVIDENCES = [
  { id: "emf-5", name: "EMF 5" },
  { id: "freezing", name: "Temperatura Baixa" },
  { id: "writing", name: "Escrita" },
  { id: "spirit-box", name: "Spirit Box" },
  { id: "orbs", name: "Orbes" },
  { id: "dots", name: "DOTS" },
  { id: "uv", name: "UV / Digitais" },
];

// 24 FANTASMAS
const GHOSTS = [
  {
    slug: "spirit",
    name: "Spirit",
    summary: "Equilibrado, sem fraquezas claras.",
    evidences: ["emf-5", "spirit-box", "writing"],
    sanity: "normal",
    image: "/pic/Spirit.png",
  },
  {
    slug: "wraith",
    name: "Wraith",
    summary: "Evita passos e salta armadilhas.",
    evidences: ["emf-5", "spirit-box", "dots"],
    sanity: "normal",
    image: "/pic/Wraith.png",
  },
  {
    slug: "phantom",
    name: "Phantom",
    summary: "Drena sanidade ao olhar.",
    evidences: ["spirit-box", "uv", "dots"],
    sanity: "baixa",
    image: "/pic/Phantom.png",
  },
  {
    slug: "poltergeist",
    name: "Poltergeist",
    summary: "Arremessa objetos com força.",
    evidences: ["spirit-box", "uv", "writing"],
    sanity: "normal",
    image: "/pic/Poltergeist.png",
  },
  {
    slug: "banshee",
    name: "Banshee",
    summary: "Persegue um alvo específico.",
    evidences: ["uv", "orbs", "dots"],
    sanity: "normal",
    image: "/pic/Banshee.png",
  },
  {
    slug: "jinn",
    name: "Jinn",
    summary: "Rápido com a energia ligada.",
    evidences: ["emf-5", "freezing", "uv"],
    sanity: "normal",
    image: "/pic/Jinn.png",
  },
  {
    slug: "mare",
    name: "Mare",
    summary: "Mais ativo no escuro.",
    evidences: ["spirit-box", "orbs", "writing"],
    sanity: "baixa",
    image: "/pic/Mare.png",
  },
  {
    slug: "revenant",
    name: "Revenant",
    summary: "Muito veloz em perseguição, lento sem visão.",
    evidences: ["freezing", "orbs", "writing"],
    sanity: "baixa",
    image: "/pic/Revenant.png",
  },
  {
    slug: "shade",
    name: "Shade",
    summary: "Tímido, menos ativo perto de jogadores.",
    evidences: ["emf-5", "freezing", "writing"],
    sanity: "normal",
    image: "/pic/Shade.png",
  },
  {
    slug: "demon",
    name: "Demon",
    summary: "Ataca cedo e frequentemente.",
    evidences: ["freezing", "uv", "writing"],
    sanity: "baixa",
    image: "/pic/Demon.png",
  },
  {
    slug: "yurei",
    name: "Yurei",
    summary: "Focado em sanidade.",
    evidences: ["freezing", "orbs", "dots"],
    sanity: "baixa",
    image: "/pic/Yurei.png",
  },
  {
    slug: "oni",
    name: "Oni",
    summary: "Agressivo em grupo, joga objetos.",
    evidences: ["emf-5", "freezing", "dots"],
    sanity: "normal",
    image: "/pic/Oni.png",
  },
  {
    slug: "yokai",
    name: "Yokai",
    summary: "Atraído por vozes.",
    evidences: ["spirit-box", "orbs", "dots"],
    sanity: "normal",
    image: "/pic/Yokai.png",
  },
  {
    slug: "hantu",
    name: "Hantu",
    summary: "Mais rápido no frio.",
    evidences: ["freezing", "orbs", "uv"],
    sanity: "normal",
    image: "/pic/Hantu.png",
  },
  {
    slug: "goryo",
    name: "Goryo",
    summary: "DOTS só na câmera quando o local está vazio.",
    evidences: ["emf-5", "uv", "dots"],
    sanity: "normal",
    image: "/pic/Goryo.png",
  },
  {
    slug: "myling",
    name: "Myling",
    summary: "Passos silenciosos; forte no som.",
    evidences: ["emf-5", "uv", "writing"],
    sanity: "normal",
    image: "/pic/Myling.png",
  },
  {
    slug: "onryo",
    name: "Onryo",
    summary: "Reage a chamas e velas.",
    evidences: ["spirit-box", "freezing", "orbs"],
    sanity: "normal",
    image: "/pic/Onryo.png",
  },
  {
    slug: "the-twins",
    name: "The Twins",
    summary: "Dois focos de eventos.",
    evidences: ["emf-5", "spirit-box", "freezing"],
    sanity: "normal",
    image: "/pic/The-Twins.png",
  },
  {
    slug: "raiju",
    name: "Raiju",
    summary: "Acelera com eletrônicos ligados.",
    evidences: ["emf-5", "orbs", "dots"],
    sanity: "normal",
    image: "/pic/Raiju.png",
  },
  {
    slug: "obake",
    name: "Obake",
    summary: "Digitais mutáveis.",
    evidences: ["emf-5", "orbs", "uv"],
    sanity: "normal",
    image: "/pic/Obake.png",
  },
  {
    slug: "the-mimic",
    name: "The Mimic",
    summary: "Imita outros (orbes enganam).",
    evidences: ["spirit-box", "freezing", "uv"],
    sanity: "variável",
    image: "/pic/The-Mimic.png",
  },
  {
    slug: "moroi",
    name: "Moroi",
    summary: "Acelera com sanidade baixa.",
    evidences: ["spirit-box", "freezing", "writing"],
    sanity: "baixa",
    image: "/pic/Moroi.png",
  },
  {
    slug: "deogen",
    name: "Deogen",
    summary: "Sempre sabe onde você está; lento de perto.",
    evidences: ["spirit-box", "writing", "dots"],
    sanity: "variável",
    image: "/pic/Deogen.png",
  },
  {
    slug: "thaye",
    name: "Thaye",
    summary: "Enfraquece com o tempo próximo do time.",
    evidences: ["orbs", "writing", "dots"],
    sanity: "variável",
    image: "/pic/Thaye.png",
  },
];

// 13 MAPAS
const MAPS = [
  {
    slug: "tanglewood",
    name: "Tanglewood Drive",
    size: "pequeno",
    image: "/pic/tanglewood.png",
  },
  {
    slug: "willow",
    name: "Willow Street",
    size: "pequeno",
    image: "/pic/willow.png",
  },
  {
    slug: "edgefield",
    name: "Edgefield Road",
    size: "pequeno",
    image: "/pic/edgefield.png",
  },
  {
    slug: "ridgeview",
    name: "Ridgeview Court",
    size: "pequeno",
    image: "/pic/ridgeview.png",
  },
  {
    slug: "grafton",
    name: "Grafton Farmhouse",
    size: "médio",
    image: "/pic/grafton.png",
  },
  {
    slug: "bleasdale",
    name: "Bleasdale Farmhouse",
    size: "médio",
    image: "/pic/bleasdale.png",
  },
  {
    slug: "brownstone",
    name: "Brownstone High School",
    size: "grande",
    image: "/pic/brownstone.png",
  },
  {
    slug: "prison",
    name: "Prison",
    size: "grande",
    image: "/pic/prison.png",
  },
  {
    slug: "maple",
    name: "Maple Lodge Campsite",
    size: "médio",
    image: "/pic/maple.png",
  },
  {
    slug: "camp-woodwind",
    name: "Camp Woodwind",
    size: "pequeno",
    image: "/pic/campwoodwind.png",
  },
  {
    slug: "sunny-meadows",
    name: "Sunny Meadows",
    size: "grande",
    image: "/pic/sunny.png",
  },
];

// 7 OBJETOS AMALDIÇOADOS
const CURSED = [
  {
    id: "ouija-board",
    name: "Tabuleiro Ouija",
    effect: "Perguntas diretas",
    risk: "Drena sanidade",
    tip: "Pergunte curto e tenha rota de fuga.",
    image: "/pic/ouija-board.png",
  },
  {
    id: "tarot-cards",
    name: "Tarô",
    effect: "Efeitos aleatórios",
    risk: "Pode iniciar caçada",
    tip: "Use em local seguro.",
    image: "/pic/tarot-cards.png",
  },
  {
    id: "music-box",
    name: "Caixa de Música",
    effect: "Aproxima o fantasma",
    risk: "Pode iniciar caçada",
    tip: "Use próximo à saída.",
    image: "/pic/music-box.png",
  },
  {
    id: "haunted-mirror",
    name: "Espelho Amaldiçoado",
    effect: "Mostra a sala fantasma",
    risk: "Drena sanidade rápido",
    tip: "Olhe pouco tempo.",
    image: "/pic/haunted-mirror.png",
  },
  {
    id: "summoning-circle",
    name: "Círculo de Invocação",
    effect: "Força aparição",
    risk: "Inicia caçada",
    tip: "Smudge e fuga prontos.",
    image: "/pic/summoning-circle.png",
  },
  {
    id: "voodoo-doll",
    name: "Boneca Vodu",
    effect: "Força interações",
    risk: "Pode iniciar caçada",
    tip: "Controle sanidade.",
    image: "/pic/voodoo-doll.png",
  },
  {
    id: "monkey-paw",
    name: "Mão do Macaco",
    effect: "Desejos com preço",
    risk: "Penalidades severas",
    tip: "Leia efeitos antes de usar.",
    image: "/pic/monkey-paw.png",
  },
];

// 3 TIPOS DE CAÇADA (usado como referência na home/ghosts)
const HUNTS = [
  {
    id: "natural",
    name: "Natural",
    behavior: "Inicia ao atingir limite de sanidade do fantasma.",
    counter: ["Velas", "Crucifixo", "Luzes"],
  },
  {
    id: "cursed",
    name: "Amaldiçoada",
    behavior: "Iniciada por objeto amaldiçoado.",
    counter: ["Planeje fuga", "Smudge", "Rotas curtas"],
  },
  {
    id: "ability",
    name: "Com habilidade",
    behavior: "Habilidade específica altera gatilho.",
    counter: ["Identifique padrão", "Gerencie sanidade"],
  },
];

// 20 ITENS (cada um com níveis 1/2/3)
const ITEMS = [
  {
    slug: "flashlight",
    name: "Lanterna",
    description: "Ilumina o ambiente.",
    thumbImg: "pic/flashlight.png",
    variants: [
      { level: 1, label: "Nível 1", effect: "Feixe fraco", price: 0 },
      { level: 2, label: "Nível 2", effect: "Feixe médio", price: 25 },
      { level: 3, label: "Nível 3", effect: "Feixe forte", price: 50 },
    ],
  },
  {
    slug: "uv-light",
    name: "Luz Ultravioleta",
    description: "Revela digitais.",
    thumbImg: "pic/uv-light.png",
    variants: [
      { level: 1, label: "Nível 1", effect: "Alcance curto", price: 15 },
      { level: 2, label: "Nível 2", effect: "Alcance médio", price: 25 },
      { level: 3, label: "Nível 3", effect: "Alcance amplo", price: 35 },
    ],
  },
  {
    slug: "emf-reader",
    name: "EMF",
    description: "Detecta EMF 5.",
    thumbImg: "pic/emf.jpg",
    variants: [
      {
        level: 1,
        label: "Nível 1",
        effect: "Leitura menos estável",
        price: 45,
      },
      { level: 2, label: "Nível 2", effect: "Estabilidade média", price: 55 },
      { level: 3, label: "Nível 3", effect: "Estabilidade alta", price: 65 },
    ],
  },
  {
    slug: "thermometer",
    name: "Termômetro",
    description: "Detecta Temperatura Baixa.",
    thumbImg: "pic/thermometer.jpg",
    variants: [
      { level: 1, label: "Nível 1", effect: "Atualiza devagar", price: 30 },
      { level: 2, label: "Nível 2", effect: "Velocidade média", price: 45 },
      { level: 3, label: "Nível 3", effect: "Atualiza rápido", price: 60 },
    ],
  },
  {
    slug: "spirit-box",
    name: "Spirit Box",
    description: "Comunicação por voz.",
    thumbImg: "pic/spirit-box.jpg",
    variants: [
      { level: 1, label: "Nível 1", effect: "Alcance curto", price: 50 },
      { level: 2, label: "Nível 2", effect: "Filtragem melhor", price: 65 },
      { level: 3, label: "Nível 3", effect: "Alcance amplo", price: 80 },
    ],
  },
  {
    slug: "video-camera",
    name: "Câmera de Vídeo",
    description: "Detecta orbes.",
    thumbImg: "pic/video-camera.png",
    variants: [
      { level: 1, label: "Nível 1", effect: "Sem tripé", price: 50 },
      { level: 2, label: "Nível 2", effect: "Tripé básico", price: 65 },
      { level: 3, label: "Nível 3", effect: "Visão melhorada", price: 80 },
    ],
  },
  {
    slug: "photo-camera",
    name: "Câmera de Foto",
    description: "Evidências fotográficas.",
    thumbImg: "pic/photo-camera.jpg",
    variants: [
      { level: 1, label: "Nível 1", effect: "Poucas exposições", price: 40 },
      { level: 2, label: "Nível 2", effect: "Exposições médias", price: 55 },
      { level: 3, label: "Nível 3", effect: "Mais exposições", price: 70 },
    ],
  },
  {
    slug: "dots-projector",
    name: "Projetor DOTS ",
    description: "Identifica formas.",
    thumbImg: "pic/projetor-dots.jpg",
    variants: [
      { level: 1, label: "Nível 1", effect: "Área pequena", price: 35 },
      { level: 2, label: "Nível 2", effect: "Área média", price: 50 },
      { level: 3, label: "Nível 3", effect: "Área ampla", price: 65 },
    ],
  },
  {
    slug: "ghost-writing-book",
    name: "Livro de Escrita Fantasma",
    description: "Coleta Escrita.",
    thumbImg: "pic/ghost-writing-book.jpg",
    variants: [
      { level: 1, label: "Nível 1", effect: "Sem diferencial", price: 40 },
      { level: 2, label: "Nível 2", effect: "Mais legível", price: 55 },
      { level: 3, label: "Nível 3", effect: "Melhor detecção", price: 70 },
    ],
  },
  {
    slug: "crucifix",
    name: "Crucifixo",
    description: "Previne caçada.",
    thumbImg: "pic/crucifix.jpg",
    variants: [
      { level: 1, label: "Nível 1", effect: "Raio menor", price: 30 },
      { level: 2, label: "Nível 2", effect: "Raio médio", price: 45 },
      { level: 3, label: "Nível 3", effect: "Raio maior", price: 60 },
    ],
  },
  {
    slug: "smudge-stick",
    name: "Incenso",
    description: "Acalma o fantasma.",
    thumbImg: "pic/smudge-stick.jpg",
    variants: [
      { level: 1, label: "Nível 1", effect: "Duração curta", price: 15 },
      { level: 2, label: "Nível 2", effect: "Duração média", price: 25 },
      { level: 3, label: "Nível 3", effect: "Duração longa", price: 35 },
    ],
  },
  {
    slug: "igniter",
    name: "Isqueiro/Fósforo",
    description: "Acende velas/incenso.",
    thumbImg: "pic/igniter.jpg",
    variants: [
      { level: 1, label: "Nível 1", effect: "Acende devagar", price: 10 },
      { level: 2, label: "Nível 2", effect: "Acende ok", price: 20 },
      { level: 3, label: "Nível 3", effect: "Acende rápido", price: 30 },
    ],
  },
  {
    slug: "firelight",
    name: "Vela",
    description: "Reduz drenagem de sanidade.",
    thumbImg: "pic/firelight.jpg",
    variants: [
      { level: 1, label: "Nível 1", effect: "Queima curta", price: 15 },
      { level: 2, label: "Nível 2", effect: "Queima média", price: 25 },
      { level: 3, label: "Nível 3", effect: "Queima longa", price: 35 },
    ],
  },
  {
    slug: "salt",
    name: "Sal",
    description: "Rastros do fantasma.",
    thumbImg: "pic/salt.jpg",
    variants: [
      { level: 1, label: "Nível 1", effect: "Poucas cargas", price: 20 },
      { level: 2, label: "Nível 2", effect: "Cargas médias", price: 30 },
      { level: 3, label: "Nível 3", effect: "Mais cargas", price: 40 },
    ],
  },
  {
    slug: "tripod",
    name: "Tripé",
    description: "Suporte p/ câmera.",
    thumbImg: "pic/tripod.jpg",
    variants: [
      { level: 1, label: "Nível 1", effect: "Estável básico", price: 25 },
      { level: 2, label: "Nível 2", effect: "Melhor ajuste", price: 35 },
      { level: 3, label: "Nível 3", effect: "Rápido de montar", price: 45 },
    ],
  },
  {
    slug: "motion-sensor",
    name: "Sensor de Movimento",
    description: "Detecta passagem.",
    thumbImg: "pic/motion-sensor.jpg",
    variants: [
      { level: 1, label: "Nível 1", effect: "Alcance curto", price: 45 },
      { level: 2, label: "Nível 2", effect: "Alcance médio", price: 60 },
      { level: 3, label: "Nível 3", effect: "Alcance amplo", price: 75 },
    ],
  },
  {
    slug: "sound-sensor",
    name: "Sensor de Som",
    description: "Capta sons na área.",
    thumbImg: "pic/sound-sensor.jpg",
    variants: [
      { level: 1, label: "Nível 1", effect: "Raio curto", price: 50 },
      { level: 2, label: "Nível 2", effect: "Raio médio", price: 65 },
      { level: 3, label: "Nível 3", effect: "Raio amplo", price: 80 },
    ],
  },
  {
    slug: "parabolic-microphone",
    name: "Microfone Parabólico",
    description: "Capta sons distantes.",
    thumbImg: "pic/parabolic-microphone.jpg",
    variants: [
      { level: 1, label: "Nível 1", effect: "Precisão baixa", price: 60 },
      { level: 2, label: "Nível 2", effect: "Precisão média", price: 75 },
      { level: 3, label: "Nível 3", effect: "Alta precisão", price: 90 },
    ],
  },
  {
    slug: "sanity-pills",
    name: "Pílulas de Sanidade",
    description: "Recupera sanidade.",
    thumbImg: "pic/sanity-pills.jpg",
    variants: [
      { level: 1, label: "Nível 1", effect: "+25% aprox.", price: 45 },
      { level: 2, label: "Nível 2", effect: "+35% aprox.", price: 60 },
      { level: 3, label: "Nível 3", effect: "+45% aprox.", price: 75 },
    ],
  },
  {
    slug: "head-gear",
    name: "Equipamento de cabeça",
    description: "Câmera e lanterna de cabeça.",
    thumbImg: "pic/head-gear.jpg",
    variants: [
      { level: 1, label: "Nível 1", effect: "Brilho baixo", price: 10 },
      { level: 2, label: "Nível 2", effect: "Brilho médio", price: 20 },
      { level: 3, label: "Nível 3", effect: "Brilho alto", price: 30 },
    ],
  },
  {
    slug: "sound-recorder",
    name: "Gravador de som",
    description: "Gravar sons",
    thumbImg: "pic/sound-recorder.jpg",
    variants: [
      { level: 1, label: "Nível 1", effect: "Brilho baixo", price: 10 },
      { level: 2, label: "Nível 2", effect: "Brilho médio", price: 20 },
      { level: 3, label: "Nível 3", effect: "Brilho alto", price: 30 },
    ],
  },
];

// ---------------------------------------------
// Expor no escopo global para o seed do Firestore
// ---------------------------------------------
window.EVIDENCES = EVIDENCES;
window.GHOSTS = GHOSTS;
window.MAPS = MAPS;
window.CURSED = CURSED;
window.ITEMS = ITEMS;
window.HUNTS = HUNTS;
window.TIPS = TIPS;
