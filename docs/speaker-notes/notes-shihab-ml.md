# Speaker Notes -- Shihab (ML & Analysis Presenter)

**Slides covered:** 6-12 (EDA, Approach, Findings, Impact, Limitations, Conclusion)
**Estimated speaking time:** 4.5-5.5 minutes

---

## Slide 6: EDA Highlights

"Thanks [Friend's name]. So I'll walk you through what we found in the data and the modeling approach we took."

"When we first explored the dataset, a few things jumped out immediately."

"First, the global map of bleaching observations shows clear geographic clustering. The Indo-Pacific -- especially around the Philippines, Indonesia, and the Great Barrier Reef -- and the Caribbean are the two major hotspot regions. That's consistent with the literature, but seeing it in the data makes it concrete."

"Second, the time series of average bleaching severity by year shows a sharp acceleration after 2010. Bleaching isn't just increasing linearly -- it's accelerating. Each successive global bleaching event is worse than the last."

"Third, there's a strong positive correlation between Degree Heating Weeks -- DHW, which is the cumulative thermal stress metric -- and bleaching severity. That's expected. More heat stress means more bleaching."

"But the fourth chart is where things get interesting. When we plotted SST variance -- how much the sea surface temperature fluctuates at a given location -- against bleaching severity, we saw a negative relationship. Locations with higher temperature variability actually had less bleaching. We'll come back to why that matters."

---

## Slide 7: Our Approach -- XGBoost + SHAP

"For the modeling, we chose XGBoost -- gradient-boosted decision trees. I want to explain why."

"Our data is tabular. We have geographic coordinates, environmental measurements like SST and DHW, depth, and categorical features like coral taxa and country. For this kind of structured tabular data, tree-based models consistently outperform deep learning."

"To give a concrete example: Yang Xu, the first-place winner of NASA's Tick Tick Bloom competition on DrivenData, wrote about trying CNNs first. His quote was 'I tried using a CNN model' and got 'very high RMSEs.' He switched to tree-based approaches and won the competition. That pattern -- neural networks underperforming on tabular environmental data -- is well documented."

"Beyond performance, we needed interpretability. We're not just trying to predict bleaching -- we need to explain which factors drive reef collapse so we can answer the research question and make actionable recommendations. That's where SHAP comes in. SHAP values -- SHapley Additive exPlanations -- decompose each prediction into the contribution of each feature, so we can say exactly why the model thinks a particular reef is high-risk."

"For validation, we used a temporal split: training on data before 2015, validating on 2015 to 2018, and testing on 2018 to 2020. This matters because a random split would let the model 'see' future bleaching patterns during training, which would inflate accuracy and not reflect how the model would perform on genuinely new data."

---

## Slide 8: Key Finding 1 -- Which Reefs Are Most at Risk

"So what did the model tell us about which reefs are most at risk?"

"The SHAP analysis identified Degree Heating Weeks as the single most important predictor of bleaching severity. That's followed by the magnitude of SST anomalies, low SST variance -- which I'll explain next -- and shallow depth. Shallower reefs get more thermal stress because they're closer to the surface."

"When we map the risk scores, the highest-risk regions are: Southeast Asia, particularly the Philippines and Indonesia; the Caribbean, especially Jamaica, Haiti, and the US Virgin Islands; parts of the Great Barrier Reef in Australia; and the East African coast -- Tanzania, Kenya, and Mozambique."

"What these regions share is a combination of high cumulative thermal stress, low historical SST variance -- meaning the corals there haven't been 'trained' by temperature fluctuations -- and critically, they're also regions with very high human dependence on reef ecosystems. That overlap between ecological risk and human vulnerability is at the heart of our research question."

---

## Slide 9: Key Finding 2 -- The Variance Paradox

"This is probably the most counterintuitive finding, and it's the one I'm most excited about."

"Our SHAP analysis independently identified SST variance as a top-five feature with a protective effect. Reefs in locations where sea surface temperature fluctuates more -- where it's not stable and predictable -- are significantly less likely to experience severe bleaching."

"This confirms what Sully et al. found in their 2019 study published in Nature Communications. Their exact words were: 'coral bleaching was significantly less common in localities with a high variance in sea-surface temperature anomalies.'"

"The biological explanation is that corals in variable-temperature environments have essentially been stress-tested by their environment. They've adapted -- or acclimated -- to temperature swings. So when a marine heat wave hits, they have physiological mechanisms to cope. It's like how someone who exercises regularly handles physical stress better than someone who's been sedentary."

"The flip side is concerning: reefs in stable, historically consistent temperature environments are the most fragile. They've never experienced significant thermal stress, so when it arrives -- as it is now, during the 4th Global Bleaching Event -- they have no built-in resilience. And many of those stable-temperature reefs are in the tropics, right where human dependence is highest."

"For conservation, this has a concrete implication: we should prioritize monitoring and intervention at stable-temperature reefs, because those are the ones most likely to collapse first and with the least natural resilience."

---

## Slide 10: Community Impact -- Who Loses Food Security

"Now the second part of our research question: which human communities are affected?"

"When we overlay our reef risk map with fisheries dependence data, the most vulnerable populations become clear."

"The Philippines has approximately 1.9 million people employed directly in fisheries, and reef fish are a primary protein source for over 100 million Filipinos. Indonesia has the largest coral reef area in the world, and reef fisheries feed millions of people across its 17,000 islands. In the Caribbean, Small Island Developing States -- or SIDS -- depend on reefs for 25 percent or more of their GDP through a combination of tourism and fisheries. And along the East African coast, subsistence fishing communities in Tanzania, Kenya, and Mozambique often have no alternative protein sources."

"The pattern is stark: the regions where reefs are most at risk are the same regions where people can least afford to lose them. This isn't a coincidence -- it's because the tropical waters that support the richest reef ecosystems are also the waters warming fastest, and the communities around them are often the ones with the fewest economic alternatives."

---

## Slide 11: Limitations & Ethical Considerations

"We want to be transparent about what our model can and cannot tell us."

"On the data side: the GCBD dataset ends at 2020, so it does not capture the current 4th Global Bleaching Event. There's also an observation bias -- we have much more data from well-studied reefs like the Great Barrier Reef and Caribbean sites than from remote Pacific islands, which means our model may underestimate risk in data-sparse regions. And our community impact analysis relies on national-level fisheries statistics rather than direct community surveys, so it's a broad estimate."

"On the ethical side: we want to be careful that risk scores are not used to write off high-risk reefs as lost causes. De-prioritizing a reef because it's 'going to die anyway' would directly harm the communities that depend on it. Conservation triage is a real debate, but the human cost of abandoning a reef should be weighted equally with the ecological prognosis."

"We'd also note that reef data collected from Indigenous communities should be governed by those communities -- there are data sovereignty considerations that matter here."

"If we had more time, we would integrate NOAA Coral Reef Watch real-time satellite data to bring the analysis up to 2026, incorporate local community surveys for ground-truth validation, and build economic impact models to quantify the dollar cost of reef collapse for specific communities."

---

## Slide 12: Conclusion & Next Steps

"So to directly answer our research question."

"Which coral reefs are most at risk of collapse? Our model identifies reefs in the Indo-Pacific and Caribbean with high cumulative thermal stress and low historical SST variance as the most vulnerable. These are the reefs that have never experienced significant temperature fluctuations and are now being hit by unprecedented heat."

"Which human communities will lose food security and income? The overlap analysis shows that Southeast Asian fishing populations, Caribbean Small Island Developing States, and East African coastal communities are the most exposed -- they have both the highest reef risk and the highest dependence on reef ecosystems."

"Our key insight is the variance paradox: reefs in stable-temperature environments are the most fragile, and conservation efforts should prioritize them precisely because they lack natural resilience."

"For next steps, we'd want to extend this to real-time monitoring by integrating NOAA satellite data from 2020 through today, build an early warning dashboard that flags at-risk communities before collapse happens rather than after, and partner with local NGOs for ground-truth validation."

"The data tells us where to look. The question is whether we act in time."

*[Pause. Thank the judges.]*

"Thank you. We're happy to take questions."

---

## Q&A Prep: Technical Questions Judges Might Ask

### Q1: "Why XGBoost specifically? Did you benchmark against other models like Random Forest or LightGBM?"

**Answer:** "XGBoost was our primary model because of its strong performance on tabular data and its native integration with SHAP for interpretability. We did compare against a Random Forest baseline during development. XGBoost outperformed it on our temporal validation split, which we attribute to its sequential boosting approach -- each tree corrects the errors of the previous ones, which helps capture the non-linear relationships between thermal stress features and bleaching severity. We didn't extensively benchmark LightGBM, but the performance difference between XGBoost and LightGBM is typically marginal on datasets of this size. The more important choice was tree-based versus neural network, and for the reasons I mentioned -- tabular data, interpretability, the Yang Xu precedent -- we're confident in the tree-based approach."

### Q2: "How do you handle the class imbalance or distribution skew in bleaching severity? Most records might be low severity."

**Answer:** "Good observation. The bleaching severity distribution is indeed skewed -- there are more low-severity and zero-severity observations than high-severity ones, partly because historical observations were collected during non-bleaching periods too. We addressed this in two ways. First, XGBoost has a built-in ability to handle imbalanced targets through its objective function and regularization parameters. Second, for the risk scoring, we're most interested in the tail -- the high-severity events -- so we evaluated model performance specifically on the upper quantiles of the severity distribution, not just overall RMSE. We also checked that the SHAP values were stable across different severity ranges to make sure our feature importance findings weren't driven by the low-severity majority."

### Q3: "The variance finding is interesting, but couldn't it be confounded by geography? Maybe high-variance locations just happen to be in regions with less thermal stress."

**Answer:** "That's a really sharp question and exactly the kind of confounding we considered. The short answer is: the SHAP analysis controls for this because SHAP values measure each feature's marginal contribution after accounting for all other features in the model, including latitude, longitude, and regional thermal stress metrics like DHW. So even after controlling for where a reef is and how much total heat stress it's received, SST variance still has an independent protective effect. That said, Sully et al. in their 2019 Nature Communications paper also controlled for geographic covariates and found the same result. So we're seeing convergent evidence from both their statistical analysis and our machine learning approach, which strengthens our confidence in this finding."
