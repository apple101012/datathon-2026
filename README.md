# [Team Name TBD] -- Coral Reef Collapse Risk & Human Community Impact

> **Research Question:** Which coral reefs are most at risk of collapse and which human communities will lose food security and income as a result?

> **Track:** Sustainability & Critical Infrastructure
> **Event:** SBU AI Community Datathon 2026

## Team

| Name | Role | GitHub |
|------|------|--------|
| [Your Name] | ML Analysis & Data Science | [@your-github] |
| [Friend's Name] | Domain Research & Presentation | [@nyviruzz] |

## Abstract

This project combines satellite-derived sea surface temperature data, coral bleaching observation records, and socioeconomic indicators to model which coral reef ecosystems face the highest risk of collapse under current climate trajectories. Using machine learning (XGBoost) and SHAP-based interpretability, we identify the environmental and human factors that best predict bleaching severity, then map those risk scores onto the coastal communities most dependent on reef fisheries and tourism for food security and income.

## Key Findings

- [Finding 1: e.g., "SST variance is the strongest protective factor against bleaching, but local human disturbances negate this resilience"]
- [Finding 2: e.g., "Coral Triangle and Pacific Island communities face the highest compound risk -- extreme bleaching exposure combined with near-total dependence on reef fisheries"]
- [Finding 3: e.g., "The 2023-2025 global bleaching event pushed X% of monitored reefs past NOAA Alert Level 2 thresholds for the first time"]

## Repository Structure

```
datathon-2026/
├── notebooks/           # Jupyter analysis notebooks
├── presentation/        # Slide prompts and presentation materials
├── docs/                # Topic knowledge, speaker notes
│   ├── topic-knowledge/ # Deep-dive research document
│   └── speaker-notes/   # Individual presenter notes
├── webapp/              # Interactive visualization app (bonus)
├── requirements.txt     # Python dependencies
└── README.md            # This file
```

## Datasets Used

- NOAA Coral Reef Watch. "Daily Global 5km Satellite Coral Bleaching Monitoring Products (v3.1)." *NOAA Coral Reef Watch*, 2023-2025. https://coralreefwatch.noaa.gov/product/5km/
- Donner, S.D., Rickbeil, G.J.M., & Heron, S.F. "A new, high-resolution global mass coral bleaching database." *PLOS ONE*, vol. 12, no. 4, 2017, e0175490. https://doi.org/10.1371/journal.pone.0175490
- [Additional datasets TBD -- e.g., World Resources Institute Reefs at Risk, SEDAC population data, World Bank fisheries data]

## Methodology

1. **Data Collection:** Satellite SST records from NOAA CRW, historical bleaching observations, and socioeconomic indicators for reef-dependent communities.
2. **Feature Engineering:** Degree Heating Weeks (DHW), SST anomalies, SST variance, chlorophyll-a concentration, proximity to human populations, fishing pressure estimates.
3. **Modeling:** XGBoost gradient-boosted trees trained on historical bleaching events with temporal validation (train on pre-2020, validate on 2020-2023, test on 2023-2025).
4. **Interpretability:** SHAP (SHapley Additive exPlanations) values to identify which factors drive bleaching risk at each reef location.
5. **Community Impact Mapping:** Overlay reef risk scores with socioeconomic dependence data to identify the human communities most threatened by reef collapse.

## How to Run

1. Clone the repo:
   ```bash
   git clone https://github.com/[your-username]/datathon-2026.git
   cd datathon-2026
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Open the analysis notebook:
   ```bash
   jupyter notebook notebooks/coral_reef_analysis.ipynb
   ```
4. Run all cells to reproduce the analysis.

## Tech Stack

- **Python 3.10+** -- Core language
- **XGBoost** -- Gradient-boosted tree modeling
- **SHAP** -- Model interpretability
- **Pandas / NumPy** -- Data manipulation
- **Matplotlib / Seaborn / Plotly** -- Visualization
- **Jupyter** -- Interactive analysis
- **Streamlit** (bonus) -- Interactive web app

## Acknowledgments

- SBU AI Community for organizing the Datathon 2026
- NOAA Coral Reef Watch for open satellite data products
- International Coral Reef Initiative (ICRI) for policy frameworks and reporting
- World Resources Institute for the Reefs at Risk dataset

## License

MIT
