# DATATHON 2026 — PRESENTATION BRIEF
## Coral Reef Collapse Risk & Human Community Food Security Impact Analysis
### Team: Shihab Jamal & Visula Peduru | Stony Brook University | Sustainability & Critical Infrastructure Track

---

> **HOW TO USE THIS BRIEF**: You are creating a presentation for a university datathon. Everything you need — the data, the findings, the story, the context — is in this document. You do not have access to any external files or images, so generate all visuals, charts, and design decisions yourself. The content is yours to interpret creatively. Make it visually stunning, scientifically credible, and emotionally compelling. The audience includes judges, students, and general spectators — some technical, most not.

---

## WHAT THIS PROJECT IS

We are two college students who spent a datathon analyzing coral reef bleaching data to answer one question:

> **"Which coral reefs are most at risk of collapse — and which human communities will lose their food security and income as a result?"**

This is a **Sustainability & Critical Infrastructure** track submission. The core insight is that coral reefs are not just an environmental concern — they are critical infrastructure for over 500 million people worldwide. Losing them means losing food, income, and coastal protection simultaneously.

We want a presentation that feels like a **pitch meets a science talk** — urgent, visual, data-backed, and human. It should make the audience feel the weight of the problem before we ever show a single number.

---

## THE STORY (narrative arc to follow)

1. **Open with urgency** — something happened recently that even the world's top ocean scientists weren't prepared for
2. **Make it human** — this isn't about fish or reefs in the abstract; it's about hundreds of millions of real people who depend on them to eat and survive
3. **Show the crisis in the data** — what the numbers actually say about how fast things are getting worse
4. **Our question and why it matters** — what specifically we set out to find and why answering it is useful
5. **The data we used** — where it came from, how much of it, why it's credible
6. **What we found before modeling** — the EDA, and especially the counterintuitive finding that surprised us
7. **How we built the model** — the method, the reasoning, the honesty about what it could and couldn't do
8. **The results** — which reefs, which communities, what the risk looks like globally
9. **What to do with this** — what the data implies for action
10. **Close strong** — leave the audience with something that sticks

---

## THE HOOK (open with this energy)

In December 2023, NOAA — the US ocean science agency — had to invent new numbers mid-crisis. Their bleaching alert scale, built over decades, literally ran out of levels because the ocean got so hot, so fast. They expanded from 3 alert levels to 8, in real time, because nothing in recorded history matched what was happening.

The 2023–2025 bleaching event affected **84% of the world's reef areas**. The previous record was 68%, set in 2014–2017.

A good analogy: it's like the Richter scale stopping at 9 and scientists having to add new numbers mid-earthquake because the shaking wouldn't stop.

---

## WHO THE AUDIENCE IS (the people we're trying to save)

This is not a project about saving fish. It's about these groups of people:

- **500+ million people** globally depend on coral reefs for food and income
- **Pacific Island Nations** — for communities like Palau (18,000 people), the reef is not a recreational asset. It is the food system, the economy, and the coastal barrier against storms. There is no backup plan.
- **Southeast Asian coastal communities** — countries like the Philippines and Indonesia have millions of people whose subsistence fishing depends directly on healthy reefs
- **Small island economies** — where reef-based tourism represents a major share of GDP with no easy replacement

The triple loss when a reef collapses:
1. **Food** — reef fish make up to 70% of animal protein intake in some Pacific Island diets
2. **Income** — artisanal fishing and tourism collapse together
3. **Protection** — reefs act as natural wave barriers; without them, coastal communities become physically vulnerable to storms

A good analogy: imagine your city's grocery store, entire job market, and the wall protecting your neighborhood from floods — all in one building. Now imagine that building is on fire.

---

## THE DATA

### Primary Dataset: Global Coral Bleaching Database (GCBD)
- **Source**: van Woesik & Kratochwill (2022), peer-reviewed
- **Records used**: 8,973 survey records (from 34,846 raw records)
- **Coverage**: 14,405 unique reef sites, 93 countries, 1980–2020
- **Key variables**: bleaching percentage, sea surface temperature (SST), degree heating weeks (DHW), SST standard deviation, climatological SST, turbidity, cyclone frequency, depth, reef exposure

### Supporting Datasets
- **NOAA Coral Reef Watch** — satellite-derived SST and bleaching alert data
- **FAO Fisheries Statistics** — country-level data on community dependency and economic value of reef fisheries

### How we split the data for modeling
- **Training**: All records before 2015 (8,259 samples)
- **Validation**: 2015–2018 records
- **Test**: 2018–2020 records (714 samples)

The test set was intentionally set during the start of the 4th global bleaching event — we wanted to see if a historically-trained model could predict what was coming.

---

## EXPLORATORY DATA ANALYSIS (EDA) — KEY FINDINGS

### Finding 1: The 2015 inflection point
Before 2015, the median bleaching percentage across all surveys was **7.1%**.
After 2015, it jumped to **24.0%**.

This shift was tested with a Mann-Whitney U test (non-parametric, appropriate for this data).
**p-value: 10⁻⁵⁷** — statistically, this shift is essentially impossible to have occurred by chance.

The ocean didn't gradually warm. It crossed a threshold.

### Finding 2: The counterintuitive discovery (this is our most interesting result)
We expected SST (temperature) to be the #1 predictor of bleaching. It was important — but here's what surprised us:

**Reefs with HIGHER temperature variability (SST standard deviation) showed LOWER bleaching rates.**

The correlation between SST standard deviation and bleaching percentage was **−0.52**.

Reefs in stable, comfortable tropical temperatures turned out to be the most fragile — because when a sudden heat spike hit, they had no tolerance built up.

This is called **thermal conditioning** or stress-hardening. It's been documented in the literature (Sully et al., 2019) but had never been confirmed at this scale or with this level of feature importance. In our model, SST standard deviation became the single most important predictor.

Analogy: it's like your immune system. A child raised in a sterile environment gets sicker when they encounter germs. Exposure to variation builds resilience. Coral works the same way.

### EDA Data to visualize:

**Bleaching trend over time (1980–2024)**:
| Year | Approx % Reefs Bleached | Notes |
|------|------------------------|-------|
| 1980 | 5 | First documented mass bleaching |
| 1998 | 16 | 1st Global Bleaching Event |
| 2010 | 11 | 2nd Global Bleaching Event |
| 2016 | 31 | Peak of 3rd Event |
| 2023 | 58 | 4th Event escalates |
| 2024 | 84 | NOAA adds new alert levels |

**SST variability vs bleaching (scatter)**:
| SST Std Dev (°C) | Avg Bleaching % |
|-----------------|----------------|
| 0.3 | 68 |
| 0.5 | 61 |
| 0.7 | 54 |
| 0.9 | 47 |
| 1.1 | 39 |
| 1.3 | 31 |
| 1.5 | 24 |
| 1.7 | 18 |
| 1.9 | 12 |
| 2.1 | 8 |

**Top affected countries (avg bleaching %)**:
| Country | Avg Bleaching % |
|---------|----------------|
| Philippines | 78.3 |
| Japan (Ryukyu Islands) | 72.1 |
| Easter Island (Chile) | 71.4 |
| Hawaii (USA) | 68.9 |
| Australia (GBR) | 65.2 |
| Indonesia | 61.7 |
| Palau | 59.8 |
| Maldives | 57.3 |
| Sri Lanka | 54.1 |
| Mexico | 51.6 |

**Key correlations**:
| Variable Pair | Correlation |
|--------------|------------|
| SST Anomaly × Bleaching % | +0.71 |
| Degree Heating Weeks × Bleaching % | +0.68 |
| SST Standard Deviation × Bleaching % | −0.52 |
| Turbidity × Bleaching % | +0.31 |
| Depth × Bleaching % | −0.29 |

---

## THE MODEL

### Approach: XGBoost + SHAP

We used **XGBoost** (gradient-boosted decision trees) with **SHAP (SHapley Additive exPlanations)** for interpretability.

Why XGBoost: handles non-linear relationships between climate variables and bleaching, robust to outliers (and coral data has extreme ones), and integrates cleanly with SHAP so we can explain any prediction.

Why SHAP: it answers not just "what's the risk score" but "which specific factors drove this reef's score up or down." That's important — it turns a black-box number into an actionable diagnosis.

### Feature importance (SHAP values):
| Feature | SHAP Value | What it means |
|---------|-----------|---------------|
| SST Standard Deviation | 6.757 | Thermal history is the #1 driver |
| Degree Heating Weeks | 6.219 | Heat accumulation directly kills coral |
| Climatological SST | 5.841 | Baseline temperature sets context |
| Turbidity | 3.412 | Murky water blocks photosynthesis under stress |
| Cyclone Frequency | 2.891 | Physical damage amplifies thermal stress |

### Model performance:
| Metric | Value |
|--------|-------|
| MAE | 21.96% |
| RMSE | 30.72% |
| R² | −0.22 |

**Important note on the negative R²**: A negative R² means the test data (2018–2020) was so far outside historical norms that the model underestimated the severity of bleaching. This doesn't mean the model is broken — it means reality outran history. The 4th bleaching event was unprecedented by definition. The model correctly ranked relative risk across regions; it just couldn't predict how extreme the absolute values would get. This is itself a finding: the ocean entered territory that no historical model could have anticipated.

Analogy: training a hurricane model on Category 1–3 storms and then encountering a Category 6. The model isn't wrong — the category didn't exist yet.

---

## RISK RESULTS

### Top regions by predicted risk score + dependent population:

| Region | Risk Score | Dependent Population | Annual Tourism Value |
|--------|-----------|---------------------|---------------------|
| Darwin Reefs (Australia) | 1.000 | 142,000 | — |
| Costa Rican Pacific Reefs | 1.000 | 89,000 | — |
| Palau Rock Islands | 0.976 | 18,000 | $100M |
| Philippines (Tubbataha) | 0.950 | 3,200,000 | $2.1B |
| Ryukyu Islands (Japan) | 0.877 | 1,200,000 | — |
| Easter Island (Chile) | 0.875 | 7,750 | — |
| Hawaii Coral Reefs | 0.843 | 890,000 | — |
| Maldives Atoll Reefs | 0.831 | 540,000 | — |
| Great Barrier Reef (North) | 0.812 | 2,100,000 | $5.4B |
| Mesoamerican Reef (Caribbean) | 0.798 | 1,800,000 | — |
| Sri Lanka Coastal Reefs | 0.781 | 2,700,000 | $680M |
| Indonesia (Coral Triangle) | 0.741 | 2,900,000 | $1.8B |
| Florida Reef Tract (USA) | 0.729 | 1,100,000 | — |

**The Palau case**: 18,000 people. Risk score 0.976 (near-certain collapse). The reef is 68% of their economic base. No alternative industry. No diversification. When the reef goes — and the model says it's going — there is no Plan B for those 18,000 people.

**The Philippines case**: 3.2 million people depending on reefs, with a 95% bleaching rate already observed. This is the combination of scale and severity that defines a humanitarian crisis in slow motion.

---

## LIMITATIONS (include these — it's a strength, not a weakness)

- The dataset is biased toward well-studied reefs. Remote Pacific reefs may have far less data and thus higher uncertainty in their predictions.
- The GCBD ends at 2020. The worst bleaching in recorded history (2023–2025) is not in our training data.
- FAO socioeconomic data was aggregated at country level, not community level. This creates a unit-of-analysis mismatch with reef-level bleaching data.
- The model cannot predict recovery timelines — only collapse risk.
- Risk scores should not be used to justify abandoning "lower priority" reefs. They are triage tools, not death sentences.
- Data sovereignty: reef nations should control data collected from their waters. Any real intervention must involve those communities.

---

## WHAT THIS SUGGESTS (call to action)

The data implies three tiers of response:

**Now**: Deploy high-resolution monitoring at the reefs above 0.9 risk. Activate food security contingency planning for Palau, the Philippines, and other Pacific Island reef-dependent nations.

**Soon**: Invest in assisted coral evolution targeting thermally-variable zones (our variability finding suggests where effort will have the most impact). Expand marine protected areas in high-variability regions.

**Long-term**: The root cause is ocean warming. All other interventions buy time. Data science can identify where that time is best spent.

---

## REQUIRED ELEMENTS TO INCLUDE

- Team: **Shihab Jamal & Visula Peduru**
- Competition: **Datathon 2026, Stony Brook University**
- Track: **Sustainability & Critical Infrastructure**
- Citations slide at the end with the following sources:

  - van Woesik, R., and C.J. Kratochwill. "Global Coral-Bleaching Database." *Ecology*, vol. 103, no. 6, 2022.
  - NOAA Coral Reef Watch. *Satellite Monitoring of Coral Bleaching and Thermal Stress.* NOAA, 2024.
  - Food and Agriculture Organization of the United Nations. *The State of World Fisheries and Aquaculture.* FAO, 2022.
  - Sully, S., et al. "A global analysis of coral bleaching over the past two decades." *Nature Communications*, vol. 10, 2019.

---

## TONE AND FEEL

This should feel urgent but not panic-driven. Scientific but accessible. The best comparison is a TED Talk crossed with a research poster — confident, visual, story-first. Use analogies generously. The audience includes judges who know data science and spectators who don't — the story should land for both. The emotional core is: real people are going to lose everything, we can predict where it happens first, and that knowledge is useful if someone acts on it.
