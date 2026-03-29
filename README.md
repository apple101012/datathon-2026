# Coral Reef Collapse Risk & Human Community Impact

> **Research Question:** Which coral reefs are most at risk of collapse and which human communities will lose food security and income as a result?

> **Track:** Sustainability & Critical Infrastructure
> **Event:** SBU AI Community Datathon 2026

## Team

| Name | Role | GitHub |
|------|------|--------|
| Shihab Jamal | ML Analysis & Data Science | [@apple101012](https://github.com/apple101012) |
| Nyviruz | Domain Research & Presentation | [@nyviruzz](https://github.com/nyviruzz) |

## Abstract

This project combines satellite-derived sea surface temperature data, coral bleaching observation records, and socioeconomic indicators to model which coral reef ecosystems face the highest risk of collapse under current climate trajectories. Using machine learning (XGBoost) and SHAP-based interpretability, we identify the environmental and human factors that best predict bleaching severity, then map those risk scores onto the coastal communities most dependent on reef fisheries and tourism for food security and income.

## Key Findings

- **SST variance is protective:** Reefs with higher temperature variability show significantly lower bleaching rates, even under equivalent mean thermal stress (Sully et al. 2019, *Nature Communications*)
- **Coral Triangle & Pacific Islands face highest compound risk:** Extreme bleaching exposure combined with near-total dependence on reef fisheries for food security and income
- **The 4th Global Bleaching Event (2023-2025) hit 84% of the world's reefs** -- forcing NOAA to extend its alert scale with 3 new categories (Levels 3-5) never previously needed

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
- NOAA. "Optimum Interpolation SST (OISST) v2.1." *NOAA Physical Sciences Laboratory*, 2023. https://psl.noaa.gov/data/gridded/data.noaa.oisst.v2.highres.html

## Important Note on Data

The notebook includes a synthetic data fallback that generates representative data if the Figshare API is unavailable during execution. The synthetic data mirrors the statistical distributions of the Global Coral-Bleaching Database (GCBD) but should not be cited as empirical evidence. Check the notebook output to confirm whether real or synthetic data was used in a given run.

## Methodology

1. **Data Collection:** Satellite SST records from NOAA CRW, historical bleaching observations, and socioeconomic indicators for reef-dependent communities.
2. **Feature Engineering:** Degree Heating Weeks (DHW), SST anomalies, SST variance, chlorophyll-a concentration, proximity to human populations, fishing pressure estimates.
3. **Modeling:** XGBoost gradient-boosted trees trained on historical bleaching events with temporal validation (train on pre-2020, validate on 2020-2023, test on 2023-2025).
4. **Interpretability:** SHAP (SHapley Additive exPlanations) values to identify which factors drive bleaching risk at each reef location.
5. **Community Impact Mapping:** Overlay reef risk scores with socioeconomic dependence data to identify the human communities most threatened by reef collapse.

## How to Run

1. Clone the repo:
   ```bash
   git clone https://github.com/apple101012/datathon-2026.git
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
