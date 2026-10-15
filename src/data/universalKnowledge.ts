export interface UniversalKnowledgeEntry {
  id: string;
  category: 'species' | 'particles' | 'physics' | 'maths' | 'chemistry' | 'universal';
  title: string;
  keywords: string[];
  summary: string;
  details: string;
  keyFacts: string[];
  relatedSources?: { title: string; uri: string; provider: string }[];
}

export const UNIVERSAL_KNOWLEDGE_BASE: UniversalKnowledgeEntry[] = [
  // ==========================================
  // 1. PARTICLES & PARTICLE PHYSICS
  // ==========================================
  {
    id: 'standard-model',
    category: 'particles',
    title: 'Standard Model of Particle Physics',
    keywords: ['particle', 'particles', 'standard model', 'quark', 'quarks', 'lepton', 'leptons', 'boson', 'bosons', 'higgs', 'fermion', 'fermions'],
    summary: 'The Standard Model is the foundational quantum field theory classifying all 17 known elementary particles and three of the four fundamental forces (electromagnetic, weak, and strong interactions, excluding gravity).',
    details: `### Fundamental Constituents:
• **6 Quarks (Fermions, Spin 1/2, Color Charge)**:
  - **Up (u)**: Charge +2/3 e, mass ~2.2 MeV/c²
  - **Down (d)**: Charge -1/3 e, mass ~4.7 MeV/c² (Up & Down compose protons [uud] and neutrons [udd])
  - **Charm (c)**: Charge +2/3 e, mass ~1.28 GeV/c²
  - **Strange (s)**: Charge -1/3 e, mass ~96 MeV/c²
  - **Top (t)**: Charge +2/3 e, mass ~173.1 GeV/c² (heaviest known elementary particle)
  - **Bottom (b)**: Charge -1/3 e, mass ~4.18 GeV/c²

• **6 Leptons (Fermions, Spin 1/2, No Color Charge)**:
  - **Electron (e⁻)**: Charge -1 e, mass 0.511 MeV/c², stable constituent of atoms
  - **Muon (μ⁻)**: Charge -1 e, mass 105.7 MeV/c², mean lifetime 2.2 μs
  - **Tau (τ⁻)**: Charge -1 e, mass 1.777 GeV/c²
  - **3 Neutrinos (ν_e, ν_μ, ν_τ)**: Neutral, near-zero mass, interact exclusively via the weak force and gravity

• **4 Vector Gauge Bosons (Force Mediators, Spin 1)**:
  - **Photon (γ)**: Massless mediator of Electromagnetism (QED)
  - **Gluon (g)**: 8 color-charged massless mediators of Strong Nuclear force (QCD)
  - **W⁺ / W⁻ Bosons**: Mass ~80.38 GeV/c², mediators of charged weak nuclear current (responsible for beta decay)
  - **Z⁰ Boson**: Mass ~91.19 GeV/c², mediator of neutral weak nuclear current

• **1 Scalar Boson (Spin 0)**:
  - **Higgs Boson (H⁰)**: Mass ~125.1 GeV/c², discovered at CERN LHC in 2012. Originates from the Higgs field whose nonzero vacuum expectation value spontaneously breaks electroweak symmetry and gives mass to W/Z bosons and fermions via Yukawa coupling.`,
    keyFacts: [
      'Total of 17 elementary particles + their antiparticles',
      'Governed by gauge symmetry group SU(3)_C × SU(2)_L × U(1)_Y',
      'Confirmed to extraordinary precision across CERN, Fermilab, and particle accelerators worldwide',
    ],
    relatedSources: [
      { title: 'CERN: The Standard Model', uri: 'https://home.cern/science/physics/standard-model', provider: 'CERN Particle Physics' },
      { title: 'Particle Data Group (PDG)', uri: 'https://pdg.lbl.gov', provider: 'Lawrence Berkeley National Laboratory' },
    ],
  },
  {
    id: 'higgs-boson',
    category: 'particles',
    title: 'The Higgs Boson & Higgs Mechanism',
    keywords: ['higgs', 'higgs boson', 'god particle', 'mass mechanism', 'lhc', 'cern'],
    summary: 'The Higgs boson (125.11 GeV/c²) is the scalar excitation of the Higgs field, responsible for electroweak symmetry breaking and giving inertial mass to quarks, charged leptons, and weak gauge bosons.',
    details: `### Theoretical Framework & Discovery:
• **Mechanism**: Proposed in 1964 by Peter Higgs, François Englert, Robert Brout, Gerald Guralnik, C. R. Hagen, and Tom Kibble.
• **Symmetry Breaking**: The Mexican-hat potential V(Φ) = μ²Φ†Φ + λ(Φ†Φ)² causes the Higgs field to acquire a non-zero vacuum expectation value (v ≈ 246 GeV), breaking SU(2)_L × U(1)_Y gauge symmetry into U(1)_EM.
• **Mass Generation**: W and Z bosons absorb Goldstone modes and gain mass, while photons remain massless. Fermions acquire mass via Yukawa couplings proportional to their coupling constants.
• **Experimental Confirmation**: Discovered on July 4, 2012 by the ATLAS and CMS collaborations at CERN's Large Hadron Collider.`,
    keyFacts: [
      'Only fundamental scalar (spin 0) particle discovered in nature',
      'Mass: 125.11 ± 0.11 GeV/c²',
      'Decay channels: bottom quark pairs (58%), W bosons (21%), gluons (8%), tau leptons (6%), photons (0.2%)',
    ],
  },

  // ==========================================
  // 2. SPECIES & BIOLOGY
  // ==========================================
  {
    id: 'taxonomy-universal',
    category: 'species',
    title: 'Biological Classification & Taxonomy',
    keywords: ['species', 'taxonomy', 'classification', 'domain', 'kingdom', 'phylum', 'genus', 'linnaeus', 'organism'],
    summary: 'Biological classification organizes all Earth life into an evolutionary tree based on phylogenetic relationships, cladistics, genomic sequencing, and cellular structure.',
    details: `### Linnaean Hierarchy (Broadest to Most Specific):
1. **Domain**: Archaea, Bacteria, Eukarya
2. **Kingdom**: Animalia, Plantae, Fungi, Protista (within Eukarya)
3. **Phylum / Division**: (e.g. Chordata, Arthropoda, Mollusca, Angiosperms)
4. **Class**: (e.g. Mammalia, Aves, Insecta)
5. **Order**: (e.g. Carnivora, Primates, Rodentia)
6. **Family**: (e.g. Felidae, Hominidae, Canidae)
7. **Genus**: (e.g. *Panthera*, *Homo*, *Canis*)
8. **Species**: Binomial nomenclature: *Genus specific_epithet* (e.g. *Homo sapiens*, *Panthera leo*)

### The Three Domains of Life:
• **Archaea**: Ancient prokaryotic extremophiles (thermophiles, halophiles, methanogens) with ether-linked branched lipid membranes.
• **Bacteria**: Prokaryotes with peptidoglycan cell walls, including cyanobacteria, actinobacteria, and proteobacteria.
• **Eukarya**: Organisms with membrane-bound organelles, linear chromosomes, and an organized nucleus.`,
    keyFacts: [
      'Estimated ~8.7 million eukaryotic species on Earth, with ~2.1 million scientifically described',
      'Binomial nomenclature established by Carl Linnaeus in Systema Naturae (1758)',
      'Modern taxonomy utilizes 16S/18S ribosomal RNA and whole-genome sequencing',
    ],
  },
  {
    id: 'species-exemplars',
    category: 'species',
    title: 'Prominent Species Across Earth Life',
    keywords: ['panthera leo', 'lion', 'homo sapiens', 'human', 'tardigrade', 'sequoia', 'blue whale', 'species list'],
    summary: 'A curated overview of landmark biological species spanning apex predators, extreme survivors, giants, and model organisms.',
    details: `### Iconic Species Profiles:
• **Panthera leo (Lion)**:
  - *Taxonomy*: Kingdom Animalia, Phylum Chordata, Class Mammalia, Order Carnivora, Family Felidae, Genus *Panthera*
  - *Traits*: Sexually dimorphic apex predator; unique social structure (prides of 2-40 members); territorial roar reaches 114 dB over 8 km; IUCN Vulnerable status.

• **Homo sapiens (Modern Human)**:
  - *Taxonomy*: Kingdom Animalia, Phylum Chordata, Class Mammalia, Order Primates, Family Hominidae, Genus *Homo*
  - *Traits*: Obligate bipedalism, encephalization quotient ~7.4, complex vocal syntax, symbolic culture, agriculture, and tool synthesis.

• **Balaenoptera musculus (Blue Whale)**:
  - *Taxonomy*: Class Mammalia, Order Cetacea, Family Balaenopteridae
  - *Traits*: Largest animal to ever exist on Earth (up to 30 m in length, 190,000 kg). Heart weighs ~180 kg; consumes ~4 tons of krill per day.

• **Tardigrada (Water Bear / Tardigrade)**:
  - *Taxonomy*: Phylum Tardigrada, Ecdysozoa
  - *Traits*: Microscopic extremophile (0.5 mm) capable of cryptobiosis. Withstands temperatures from -272.95°C (near absolute zero) to 150°C, pressures up to 6,000 atm (6× Mariana Trench), intense ionizing cosmic radiation, and the vacuum of open space.

• **Sequoiadendron giganteum (Giant Sequoia)**:
  - *Taxonomy*: Kingdom Plantae, Division Pinophyta, Family Cupressaceae
  - *Traits*: Earth's largest trees by volume. The "General Sherman" tree contains ~1,487 m³ of wood, standing 83.8 m tall with a base diameter of 11 m.`,
    keyFacts: [
      'Tardigrades use Dsup (damage suppressor) nuclear protein to shield DNA from radiation',
      'Blue whale vocalizations travel over 1,000 miles across ocean thermoclines',
      'Giant sequoias can live beyond 3,200 years and require wildfire for cone serotiny',
    ],
  },

  // ==========================================
  // 3. PHYSICS & COSMOLOGY
  // ==========================================
  {
    id: 'quantum-mechanics',
    category: 'physics',
    title: 'Quantum Mechanics & Wave-Particle Duality',
    keywords: ['quantum', 'quantum mechanics', 'schrodinger', 'uncertainty', 'superposition', 'entanglement', 'wavefunction'],
    summary: 'Quantum mechanics is the physics of matter and light at the subatomic scale, replacing classical determinism with probabilistic wavefunctions, quantization of energy, and non-local entanglement.',
    details: `### Fundamental Postulates & Equations:
• **Schrödinger Equation (Time-Dependent)**:
  $$i\\hbar \\frac{\\partial}{\\partial t} |\\Psi(t)\\rangle = \\hat{H} |\\Psi(t)\\rangle$$
  Governs the continuous, unitary time-evolution of a quantum state wavefunction $\\Psi$.

• **Heisenberg Uncertainty Principle**:
  $$\\Delta x \\cdot \\Delta p \\ge \\frac{\\hbar}{2}$$
  Position and linear momentum are non-commuting operators ($[\\hat{x}, \\hat{p}] = i\\hbar$), setting a strict mathematical bound on simultaneous precision.

• **Superposition Principle**:
  A quantum state can exist in a linear combination of eigenstates: $|\\psi\\rangle = \\sum c_n |\\phi_n\\rangle$. Measurement collapses the state to eigenstate $|\\phi_n\\rangle$ with probability $P_n = |c_n|²$ (Born Rule).

• **Quantum Entanglement**:
  Multi-particle states that cannot be factored as product states (e.g. EPR Bell pairs $|\\Phi^+\\rangle = \\frac{1}{\\sqrt{2}}(|00\\rangle + |11\\rangle)$), exhibiting non-local quantum correlations verified by violation of Bell inequalities (Aspect, Clauser, Zeilinger - Nobel 2022).`,
    keyFacts: [
      'Planck constant: h = 6.62607015 × 10⁻³⁴ J·s (reduced: ℏ = h / 2π)',
      'Pauli Exclusion Principle prevents any two identical fermions from occupying the same quantum state',
      'Forms the operational basis for semiconductors, lasers, MRI, and quantum computing qubits',
    ],
  },
  {
    id: 'general-relativity',
    category: 'physics',
    title: 'Einstein’s General Relativity & Spacetime',
    keywords: ['relativity', 'general relativity', 'einstein', 'gravity', 'spacetime', 'black hole', 'curvative', 'e=mc2'],
    summary: 'Albert Einstein’s 1915 geometric theory of gravitation, demonstrating that gravity is not a Newtonian force but the curvature of 4D spacetime caused by mass, momentum, and energy.',
    details: `### The Einstein Field Equations:
$$G_{\\mu\\nu} + \\Lambda g_{\\mu\\nu} = \\frac{8\\pi G}{c^4} T_{\\mu\\nu}$$
Where:
• $G_{\\mu\\nu} = R_{\\mu\\nu} - \\frac{1}{2} R g_{\\mu\\nu}$ is the Einstein tensor describing spacetime geometry
• $T_{\\mu\\nu}$ is the stress-energy tensor describing matter, energy, and pressure density
• $g_{\\mu\\nu}$ is the metric tensor
• $\\Lambda$ is the cosmological constant (Dark Energy, ~68% of cosmic energy density)
• $c$ is the speed of light ($299,792,458\\text{ m/s}$), $G$ is Newton's gravitational constant ($6.67430 \\times 10^{-11}\\text{ m}^3/(\\text{kg}\\cdot\\text{s}^2)$)

### Landmark Predictions & Verifications:
• **Gravitational Time Dilation**: Clocks tick slower in deeper gravitational potentials (essential for GPS clock synchronization).
• **Gravitational Lensing**: Light bending around massive galaxies and clusters (confirmed by Eddington in 1919).
• **Black Holes**: Solutions where escape velocity exceeds $c$. Schwarzschild radius: $r_s = \\frac{2GM}{c^2}$. Direct shadow imaged by Event Horizon Telescope (M87* and Sgr A*).
• **Gravitational Waves**: Ripples in spacetime produced by accelerating masses, detected by LIGO/Virgo from binary black hole mergers in 2015.`,
    keyFacts: [
      'Special Relativity gives mass-energy equivalence: E = mc²',
      'Speed of light in vacuum is universal invariant: c = 299,792,458 m/s',
      'Age of the Observable Universe is 13.787 ± 0.020 billion years',
    ],
  },

  // ==========================================
  // 4. MATHEMATICS
  // ==========================================
  {
    id: 'calculus-analysis',
    category: 'maths',
    title: 'Differential, Integral & Vector Calculus',
    keywords: ['calculus', 'math', 'maths', 'derivative', 'integral', 'differential equations', 'euler', 'taylor series', 'stokes'],
    summary: 'Calculus is the mathematical study of continuous change, encompassing differentiation (rates of change and slopes) and integration (accumulation and areas), unified by the Fundamental Theorem of Calculus.',
    details: `### Core Pillars of Calculus:
• **Derivative (Rate of Change)**:
  $$f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}$$
  Measures instantaneous slope and sensitivity.

• **Fundamental Theorem of Calculus (FTC)**:
  Part 1: If $F(x) = \\int_a^x f(t)dt$, then $F'(x) = f(x)$.
  Part 2: $\\int_a^b f(x)dx = F(b) - F(a)$, where $F'(x) = f(x)$.

• **Taylor & Maclaurin Series**:
  $$f(x) = \\sum_{n=0}^\\infty \\frac{f^{(n)}(a)}{n!} (x - a)^n$$
  Enables polynomial approximation of transcendental functions ($e^x, \\sin x, \\cos x$).

• **Vector Calculus & Stokes' Theorem**:
  $$\\oint_{\\partial \\Sigma} \\mathbf{F} \\cdot d\\mathbf{r} = \\iint_\\Sigma (\\nabla \\times \\mathbf{F}) \\cdot d\\mathbf{S}$$
  Unifies Green's theorem, the classical divergence theorem (Gauss), and the fundamental theorem of calculus into a single differential form $\\int_{\\partial \\Omega} \\omega = \\int_\\Omega d\\omega$.`,
    keyFacts: [
      'Independently developed in the late 17th century by Sir Isaac Newton and Gottfried Wilhelm Leibniz',
      'Euler’s Identity combines the 5 fundamental mathematical constants: e^(iπ) + 1 = 0',
      'Powers modern physics, machine learning backpropagation, fluid dynamics, and aerospace orbital mechanics',
    ],
  },
  {
    id: 'linear-algebra-matrices',
    category: 'maths',
    title: 'Linear Algebra, Matrices & Vector Spaces',
    keywords: ['linear algebra', 'matrices', 'matrix', 'eigenvalue', 'eigenvector', 'vector space', 'svd', 'determinant'],
    summary: 'Linear algebra studies vectors, vector spaces, linear transformations, and matrices, serving as the universal language of quantum mechanics, neural networks, computer graphics, and data science.',
    details: `### Fundamental Concepts:
• **Linear Transformation & Matrix Multiplication**:
  $A \\mathbf{x} = \\mathbf{b}$ maps vectors between vector spaces $\\mathbb{R}^n \\to \\mathbb{R}^m$.
• **Eigenvalues & Eigenvectors**:
  $$A \\mathbf{v} = \\lambda \\mathbf{v}$$
  Where $\\mathbf{v} \\neq \\mathbf{0}$ is an eigenvector and scalar $\\lambda$ is its corresponding eigenvalue, found via the characteristic polynomial $\\det(A - \\lambda I) = 0$.
• **Singular Value Decomposition (SVD)**:
  Any real matrix $M \\in \\mathbb{R}^{m \\times n}$ factors as $M = U \\Sigma V^T$, where $U, V$ are orthogonal and $\\Sigma$ contains non-negative singular values.
• **Inner Product & Orthogonality**:
  $\\langle \\mathbf{u}, \\mathbf{v} \\rangle = \\sum u_i v_i = 0$ indicates perpendicular vectors, normalized via Gram-Schmidt orthogonalization.`,
    keyFacts: [
      'Deep learning and LLM transformers rely on billions of matrix multiply-accumulate (GEMM) operations',
      'Quantum states are vectors in complex Hilbert space ℋ with Hermitian operators as observables',
      'Determinant det(A) measures the volume scaling factor of the transformation; non-zero implies invertibility',
    ],
  },

  // ==========================================
  // 5. CHEMISTRY & MOLECULAR SCIENCE
  // ==========================================
  {
    id: 'periodic-table-elements',
    category: 'chemistry',
    title: 'The Periodic Table & Chemical Bonding',
    keywords: ['chemistry', 'periodic table', 'elements', 'covalent', 'ionic', 'atom', 'bonding', 'reaction', 'molecules', 'valency'],
    summary: 'The periodic table arranges all 118 known chemical elements by atomic number Z (proton count), displaying periodic trends in electron configurations, electronegativity, ionization energy, and chemical reactivity.',
    details: `### Organization of Elements:
• **Periods (1-7)**: Horizontal rows corresponding to principal quantum number n of valence electrons.
• **Groups (1-18)**: Vertical columns with similar valence shell configurations:
  - Group 1: Alkali Metals (Li, Na, K, Rb, Cs, Fr) - highly reactive, +1 oxidation state
  - Group 2: Alkaline Earth Metals (Be, Mg, Ca, Sr, Ba, Ra) - +2 oxidation state
  - Groups 3-12: Transition Metals (Fe, Cu, Au, Pt, Ti) - variable oxidation states, d-orbital chemistry
  - Group 17: Halogens (F, Cl, Br, I, At) - high electronegativity, form salts
  - Group 18: Noble Gases (He, Ne, Ar, Kr, Xe, Rn) - closed octet shells, chemically inert

### Chemical Bonding Mechanisms:
1. **Covalent Bonding**: Mutual sharing of valence electron pairs between atoms (e.g. H₂O, CH₄, CO₂). Polar covalent bonds form when electronegativity difference $\\Delta EN$ is between 0.4 and 1.7.
2. **Ionic Bonding**: Electrostatic attraction following complete electron transfer from a low-electronegativity metal to a high-electronegativity non-metal (e.g. $\\text{Na} + \\text{Cl} \\to \\text{Na}^+ + \\text{Cl}^-$).
3. **Metallic Bonding**: Delocalized "sea of electrons" surrounding positive metal cation lattices, giving high thermal and electrical conductivity.
4. **Intermolecular Forces**: Hydrogen bonding (strong dipole attraction with H bonded to N, O, or F), Dipole-dipole interactions, and London dispersion forces.`,
    keyFacts: [
      '118 officially recognized elements by IUPAC (from Hydrogen Z=1 to Oganesson Z=118)',
      'Fluorine is the most electronegative element (3.98 on the Pauling scale)',
      'Carbon has unique catenation ability to form 4 covalent bonds, giving rise to millions of organic molecules',
    ],
  },
  {
    id: 'biochemistry-reactions',
    category: 'chemistry',
    title: 'Thermodynamics, Reactions & Biochemistry',
    keywords: ['thermodynamics', 'gibbs free energy', 'photosynthesis', 'respiration', 'dna', 'rna', 'organic chemistry'],
    summary: 'Chemical thermodynamics and reaction kinetics govern the spontaneity and rates of molecular transformations from industrial synthesis to biological metabolism.',
    details: `### Chemical Thermodynamics:
• **Gibbs Free Energy Equation**:
  $$\\Delta G = \\Delta H - T\\Delta S$$
  - $\\Delta G < 0$: Spontaneous exergonic reaction
  - $\\Delta G > 0$: Non-spontaneous endergonic reaction requiring energy input
  - $\\Delta G = 0$: Chemical equilibrium ($K_{eq} = e^{-\\Delta G^\\circ / (RT)}$)

### Universal Biochemical Pathways:
• **Oxygenic Photosynthesis**:
  $$6\\text{CO}_2 + 6\\text{H}_2\\text{O} + h\\nu \\xrightarrow{\\text{chlorophyll}} \\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\text{O}_2$$
  Occurs in chloroplasts, converting solar photon energy into chemical energy (glucose) and atmospheric oxygen.

• **Cellular Respiration**:
  $$\\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\text{O}_2 \\to 6\\text{CO}_2 + 6\\text{H}_2\\text{O} + \\sim 30\\text{-}32 \\text{ ATP}$$
  Encompasses Glycolysis (cytoplasm), Citric Acid / Krebs Cycle (mitochondrial matrix), and Electron Transport Chain / Oxidative Phosphorylation.

• **DNA Structure & Base Pairing**:
  Antiparallel double helix held by hydrogen bonds between complementary nitrogenous bases:
  - Adenine (A) = Thymine (T) [2 Hydrogen bonds]
  - Guanine (G) ≡ Cytosine (C) [3 Hydrogen bonds, higher thermal denaturation stability]`,
    keyFacts: [
      'Avogadro’s Constant: N_A = 6.02214076 × 10²³ particles per mole',
      'Enzymes act as biological catalysts by lowering the activation energy (E_a) of biochemical reactions',
      'ATP (Adenosine Triphosphate) releases ~30.5 kJ/mol upon hydrolysis of its terminal phosphoanhydride bond',
    ],
  },

  // ==========================================
  // 6. UNIVERSAL CONSTANTS & ASTRONOMY
  // ==========================================
  {
    id: 'universal-constants',
    category: 'universal',
    title: 'Fundamental Physical Constants of the Universe',
    keywords: ['constants', 'speed of light', 'planck constant', 'gravitational constant', 'avogadro', 'universe', 'astronomy'],
    summary: 'The universal physical constants that define the mathematical and energetic architecture of spacetime and matter throughout the cosmos.',
    details: `### The Universal Physical Constants:
• **Speed of Light in Vacuum ($c$)**:
  $$c = 299,792,458\\text{ m/s}$$
  Universal cosmic speed limit; invariant across all inertial reference frames.

• **Planck Constant ($h$)**:
  $$h = 6.62607015 \\times 10^{-34}\\text{ J}\\cdot\\text{s} \\quad (\\hbar = h/2\\pi = 1.054571817 \\times 10^{-34}\\text{ J}\\cdot\\text{s})$$
  Fundamental quantum scale linking photon energy to frequency ($E = h\\nu$).

• **Newtonian Gravitational Constant ($G$)**:
  $$G = 6.67430 \\times 10^{-11}\\text{ m}^3/(\\text{kg}\\cdot\\text{s}^2)$$
  Coupling strength of gravitational attraction between masses.

• **Elementary Electric Charge ($e$)**:
  $$e = 1.602176634 \\times 10^{-19}\\text{ C}$$
  Electric charge carried by a single proton or electron.

• **Boltzmann Constant ($k_B$)**:
  $$k_B = 1.380649 \\times 10^{-23}\\text{ J/K}$$
  Relates mean thermal kinetic energy of particles to thermodynamic temperature.

• **Cosmological Parameters**:
  - Age of the Universe: $13.787 \\pm 0.020\\text{ billion years}$
  - Observable Universe Diameter: $\\sim 93\\text{ billion light-years}$ ($8.8 \\times 10^{26}\\text{ m}$)
  - Cosmic Microwave Background (CMB) Temperature: $2.7255\\text{ K}$`,
    keyFacts: [
      'Since 2019 SI redefinition, c, h, e, and k_B have exact fixed numerical definitions without uncertainty',
      'The observable universe contains an estimated 2 trillion galaxies and ~10⁸⁰ fundamental subatomic particles',
      'Baryonic (ordinary) matter constitutes only ~5% of total cosmic mass-energy density',
    ],
  },
];

/**
 * Searches the internal encyclopedic knowledge base for deep universal coverage
 */
export function queryUniversalKnowledge(query: string): UniversalKnowledgeEntry | null {
  const q = query.toLowerCase().trim();
  if (!q) return null;

  // Direct match on ID or keywords
  for (const entry of UNIVERSAL_KNOWLEDGE_BASE) {
    if (entry.id === q || entry.title.toLowerCase() === q) {
      return entry;
    }
    for (const kw of entry.keywords) {
      if (q.includes(kw) || kw.includes(q)) {
        return entry;
      }
    }
  }

  // Broad topic match
  if (q.includes('particle') || q.includes('quark') || q.includes('boson') || q.includes('lepton')) {
    return UNIVERSAL_KNOWLEDGE_BASE[0];
  }
  if (q.includes('species') || q.includes('animal') || q.includes('plant') || q.includes('organism') || q.includes('lion') || q.includes('human') || q.includes('whale') || q.includes('tardigrade')) {
    return UNIVERSAL_KNOWLEDGE_BASE[3];
  }
  if (q.includes('physics') || q.includes('quantum') || q.includes('relativity') || q.includes('einstein') || q.includes('schrodinger')) {
    return UNIVERSAL_KNOWLEDGE_BASE[4];
  }
  if (q.includes('math') || q.includes('calculus') || q.includes('derivative') || q.includes('integral') || q.includes('matrix') || q.includes('algebra')) {
    return UNIVERSAL_KNOWLEDGE_BASE[6];
  }
  if (q.includes('chemistry') || q.includes('chemical') || q.includes('periodic') || q.includes('bond') || q.includes('element')) {
    return UNIVERSAL_KNOWLEDGE_BASE[8];
  }

  return null;
}
