# Slide Generation Prompt for Claude

Create a **12-slide presentation** (Google Slides or .pptx) for a datathon competition. The design should be clean, modern, and data-forward -- dark background (deep navy or charcoal) with coral/teal accent colors. Use sans-serif fonts. Every data claim must have a small citation footnote on the slide.

---

## Slide 1: Title Slide
- **Content:**
  - Title: "Which Coral Reefs Are Most at Risk of Collapse -- and Who Loses?"
  - Subtitle: "Sustainability & Critical Infrastructure Track"
  - Team Name: [LEAVE BLANK]
  - Event: SBU AI Community Datathon 2026
  - Date: March 28-29, 2026
- **Visual:** Full-bleed background image of a coral reef (half healthy, half bleached if possible). Team members' names at the bottom.
- **Speaker notes:** None needed -- just introduce yourselves verbally.

---

## Slide 2: Why This Matters
- **Content:**
  - "500 million+ people depend on coral reefs for food and income" -- NOAA Ocean Service
  - "$36 billion/year in tourism revenue" -- The Nature Conservancy, Ocean Wealth
  - "$6.8 billion/year in fisheries" -- The Nature Conservancy, Ocean Wealth
  - Reefs also provide coastal protection against storm surge and erosion
- **Visual:** Three large stat callout boxes (500M people, $36B tourism, $6.8B fisheries) arranged horizontally, with small icons (fish, hotel, shield). A subtle world map in the background showing reef locations.
- **Speaker notes:** Friend delivers this slide. Establishes the human stakes before the science.

---

## Slide 3: The Crisis -- 4th Global Bleaching Event
- **Content:**
  - "An estimated 84% of the world's reef areas" experienced bleaching (ICRI, 2025) -- source: https://icriforum.org/4gbe-2025/
  - This is the 4th and most severe global bleaching event on record
  - Timeline: 2023-2025, ongoing
  - Previous events: 1998, 2010, 2014-2017
- **Visual:** Timeline graphic showing all 4 global bleaching events with severity bars. The 4th event bar should be dramatically taller/wider. Include a small inset photo of bleached coral.
- **Speaker notes:** Friend delivers. "We are in the middle of the worst coral bleaching event ever recorded."

---

## Slide 4: NOAA Ran Out of Numbers
- **Content:**
  - In December 2023, NOAA extended its Coral Bleaching Alert scale from 2 levels to 5
  - Quote context: Extended "following extreme coral bleaching" because existing levels were insufficient -- source: https://www.climate.gov/news-features/featured-images/noaa-coral-reef-watch-extends-alert-scale-following-extreme-coral
  - Old scale: Watch, Warning, Alert Level 1, Alert Level 2
  - New scale: Added Alert Levels 3, 4, and 5
  - "When your measurement tool runs out of room, the problem has outpaced our expectations"
- **Visual:** Side-by-side comparison of old vs. new alert scale as a vertical bar/thermometer graphic. The new levels (3-5) should be in increasingly intense red/crimson.
- **Speaker notes:** Friend delivers. This is the storytelling hook -- make it dramatic. "The agency literally ran out of numbers."

---

## Slide 5: Our Data -- The Global Coral Bleaching Database
- **Content:**
  - Primary dataset: Global Coral Bleaching Database (GCBD)
  - "34,846 bleaching records across 93 countries" -- Nature Scientific Data, 2022
  - Variables: bleaching severity, SST, SST anomalies, DHW (Degree Heating Weeks), location, depth, coral taxa
  - Time span: 1980-2020
  - Supplementary: NOAA Coral Reef Watch satellite data, World Bank fisheries employment data
- **Visual:** A sample data table (5-6 rows) showing key columns, plus a small map with dots for observation locations colored by bleaching severity.
- **Speaker notes:** Friend delivers. Explain what each key variable means in plain English. Transition: "Now Shihab will walk you through what we found in this data."

---

## Slide 6: EDA Highlights
- **Content:**
  - Header: "What the Data Told Us"
  - Key EDA findings:
    - Bleaching severity has increased exponentially since 2010
    - Geographic clustering: Indo-Pacific and Caribbean hotspots
    - Strong correlation between DHW and bleaching severity
    - SST variance shows a surprising negative correlation with bleaching
- **Visual:** 2x2 grid of charts from the notebook:
  - Top-left: Global scatter map of bleaching observations (colored by severity)
  - Top-right: Time series of average bleaching severity by year
  - Bottom-left: DHW vs. bleaching severity scatter plot
  - Bottom-right: SST variance vs. bleaching severity scatter plot
- **Speaker notes:** Shihab delivers. Walk through each chart quadrant. "This bottom-right chart is where things get interesting -- we'll come back to that."

---

## Slide 7: Our Approach -- XGBoost + SHAP
- **Content:**
  - Model: XGBoost (gradient-boosted decision trees)
  - Why not a CNN? "I tried using a CNN model... very high RMSEs" -- Yang Xu, 1st place winner of NASA Tick Tick Bloom competition
  - Tabular data with geographic/temporal features favors tree-based models
  - Interpretability: SHAP (SHapley Additive exPlanations) for feature importance
  - Validation: Temporal split (train on pre-2015, validate on 2015-2018, test on 2018+)
- **Visual:** A simple pipeline diagram: Raw Data -> Feature Engineering -> XGBoost -> SHAP Analysis -> Risk Predictions. Below it, a small callout box with the CNN comparison quote.
- **Speaker notes:** Shihab delivers. Explain why interpretability matters for policy recommendations. The temporal validation prevents data leakage from future bleaching events informing past predictions.

---

## Slide 8: Key Finding 1 -- Which Reefs Are Most at Risk
- **Content:**
  - Header: "Highest-Risk Reef Regions"
  - Top risk factors from SHAP: Degree Heating Weeks (DHW), SST anomaly magnitude, low SST variance, shallow depth
  - Most at-risk regions: Southeast Asia (Philippines, Indonesia), Caribbean (Jamaica, Haiti, US Virgin Islands), Great Barrier Reef (Australia), East Africa (Tanzania, Kenya, Mozambique)
  - These regions show: high DHW accumulation + low historical SST variance + high human dependence
- **Visual:** World map with risk-scored reef regions (red = critical, orange = high, yellow = moderate). Top 10 countries listed in a ranked sidebar table with risk scores.
- **Speaker notes:** Shihab delivers. "The model tells us where collapse is most likely -- but the real question is what happens to the people who depend on these reefs."

---

## Slide 9: Key Finding 2 -- The Variance Paradox
- **Content:**
  - Header: "Reefs That Survive Temperature Chaos Are Stronger"
  - "Coral bleaching was significantly less common in localities with a high variance in sea-surface temperature (SST) anomalies" -- Sully et al. 2019, Nature Communications
  - Our SHAP analysis independently confirmed this: SST variance is a top-5 protective feature
  - Interpretation: Reefs exposed to variable temperatures develop thermal tolerance -- "training through stress"
  - Implication: Stable-temperature reefs are paradoxically more vulnerable to sudden warming events
- **Visual:** SHAP dependence plot for SST_Variance feature showing the negative relationship with bleaching severity. Annotate the plot with a callout arrow highlighting the protective effect zone. Include a small conceptual diagram: "Low variance reef (fragile)" vs "High variance reef (resilient)."
- **Speaker notes:** Shihab delivers. This is the "aha moment" of the presentation. Make the analogy: "It's like how someone who has never been sick gets hit hardest by a new virus."

---

## Slide 10: Community Impact -- Who Loses Food Security
- **Content:**
  - Header: "When Reefs Collapse, Communities Collapse"
  - Philippines: 1.9 million people employed in fisheries; reef degradation threatens protein source for 100M+ Filipinos
  - Indonesia: Largest coral reef area in the world; reef fisheries feed millions across 17,000 islands
  - Caribbean SIDS (Small Island Developing States): Reefs are 25%+ of GDP via tourism and fisheries
  - East Africa: Subsistence fishing communities with no alternative protein sources
  - Overlap analysis: regions with BOTH high reef risk AND high human dependence
- **Visual:** Two-layer map: reef risk (from Slide 8) overlaid with fisheries dependence data (bubble size = number of dependent people). A callout table showing top 5 most vulnerable countries with columns: Country, Reef Risk Score, People Dependent, % GDP from Reefs.
- **Speaker notes:** Shihab delivers. "This is where the data science meets the human story." Connect back to the 500M people stat from Slide 2.

---

## Slide 11: Limitations & Ethical Considerations
- **Content:**
  - Data limitations:
    - GCBD ends at 2020 -- does not capture the current 4th Global Bleaching Event
    - Observation bias: more data from well-studied reefs (Australia, Caribbean) than remote Pacific islands
    - No direct human community survey data -- fisheries dependence is estimated from national statistics
  - Ethical considerations:
    - Risk scores should not be used to de-prioritize "lost cause" reefs -- that harms dependent communities
    - Data sovereignty: reef data from Indigenous communities should be governed by those communities
  - With more time: incorporate real-time satellite data, local community surveys, and economic modeling
- **Visual:** Clean text layout with two columns: "Data Limitations" (left) and "Ethical Considerations" (right). Use subtle warning/caution icons.
- **Speaker notes:** Shihab delivers. Judges respect honesty about limitations. "We want to be transparent about what our model can and cannot tell us."

---

## Slide 12: Conclusion & Next Steps
- **Content:**
  - Answer to the research question:
    - Most at risk: Indo-Pacific and Caribbean reefs with high thermal stress and low SST variance
    - Most affected communities: Southeast Asian fishing populations, Caribbean SIDS, East African coast
  - Key insight: The variance paradox means conservation should prioritize stable-temperature reefs -- they are the most fragile
  - Next steps:
    - Integrate NOAA Coral Reef Watch real-time data (2020-2026)
    - Build an early warning dashboard for at-risk communities
    - Partner with local NGOs for ground-truth validation
  - Closing: "The data tells us where to look. The question is whether we act in time."
- **Visual:** Three-column layout: "Most At-Risk Reefs" | "Most Vulnerable Communities" | "What We Can Do." A final full-width quote bar at the bottom with the closing line.
- **Speaker notes:** Shihab delivers the conclusion. End strong. Pause after the final quote.

---

## Design Notes for Slide Generator
- Color palette: Navy (#1B2A4A) background, Coral (#FF6F61) for danger/risk, Teal (#2EC4B6) for protection/resilience, White (#FFFFFF) for text
- All citations in 8pt font at bottom of each slide
- Charts should be exported from the Jupyter notebook and inserted as images
- Total presentation time: ~8-10 minutes (roughly 45-60 seconds per slide)
- Font: Inter or Poppins for headers, system sans-serif for body
