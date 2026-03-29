# Speaker Notes -- Friend (Science & Problem Presenter)

**Slides covered:** 1-5 (Title, Why It Matters, The Crisis, NOAA Scale, Our Data)
**Estimated speaking time:** 3.5-4.5 minutes

---

## Slide 1: Title Slide

*[No formal script -- just introduce yourselves]*

"Hi everyone, I'm [Name] and this is Shihab. We're presenting in the Sustainability and Critical Infrastructure track, and our research question is: which coral reefs are most at risk of collapse, and which human communities will lose food security and income as a result?"

"I'll cover the science and the problem, and then Shihab will walk you through our analysis and what we found."

---

## Slide 2: Why This Matters

"Before we get into the data, let's talk about why this matters in human terms."

"Over 500 million people around the world depend on coral reefs for food and income. That number comes from NOAA's Ocean Service. To put that in perspective, that's more than the entire population of the European Union."

"Reefs generate approximately 36 billion dollars a year in tourism revenue and 6.8 billion dollars a year in fisheries, according to The Nature Conservancy's Ocean Wealth project. And beyond the economics, reefs act as natural sea walls -- they break up wave energy and protect coastal communities from storm surge and erosion."

"So when we talk about coral reef collapse, we're not just talking about an environmental tragedy. We're talking about food security, livelihoods, and physical safety for hundreds of millions of people."

---

## Slide 3: The Crisis -- 4th Global Bleaching Event

"Now let's talk about what's happening right now."

"We are in the middle of the 4th Global Bleaching Event, and it is the worst on record. According to the International Coral Reef Initiative -- ICRI -- an estimated 84 percent of the world's reef areas have experienced bleaching during this event. That's their 2025 assessment, published at icriforum.org."

"To give you some history: the first global bleaching event was in 1998. The second was in 2010. The third ran from 2014 to 2017 and was already considered catastrophic. And now the fourth, which began in 2023 and is still ongoing, has surpassed all of them."

"For those who may not be familiar with the mechanism: coral bleaching happens when ocean temperatures rise above a threshold that corals can tolerate. The corals expel the symbiotic algae -- called zooxanthellae -- that live in their tissues and provide them with food and color. Without these algae, the coral turns white, stops growing, and if the heat stress continues, it dies."

---

## Slide 4: NOAA Ran Out of Numbers

"Here's a detail that really captures how unprecedented this crisis is."

"In December 2023, NOAA -- the National Oceanic and Atmospheric Administration -- extended its Coral Bleaching Alert scale. The old scale had four levels: Watch, Warning, Alert Level 1, and Alert Level 2. Alert Level 2 was the maximum -- it indicated widespread bleaching and significant mortality."

"But the thermal stress during the 4th Global Bleaching Event exceeded anything the scale was designed for. So NOAA added three new levels: Alert Level 3, Alert Level 4, and Alert Level 5. Their announcement stated this was done 'following extreme coral bleaching.' That's from NOAA's Climate.gov, December 2023."

"Think about what that means. The agency responsible for monitoring coral reefs literally ran out of numbers. Their measurement tool wasn't built for what we're seeing now. When your scale has to be extended because reality exceeded your worst-case scenario, that tells you something about the severity of this problem."

---

## Slide 5: Our Data -- The Global Coral Bleaching Database

"So how do we study this problem quantitatively? We need data, and we chose the Global Coral Bleaching Database, or GCBD."

"The GCBD was published in Nature Scientific Data in 2022. It contains 34,846 bleaching records collected across 93 countries, spanning from 1980 to 2020. Each record includes the location, the observed bleaching severity, water temperature data -- including sea surface temperature and SST anomalies -- Degree Heating Weeks, which is a cumulative measure of thermal stress, depth, and in many cases the coral taxa affected."

"We chose this dataset for a few reasons. First, it's the most comprehensive global bleaching dataset publicly available. Second, it includes the environmental variables we need to model risk -- especially SST anomalies and Degree Heating Weeks. Third, it covers enough time to capture multiple bleaching events, which lets us look at long-term trends."

"We supplemented this with NOAA Coral Reef Watch satellite data for additional temperature metrics and World Bank data on fisheries employment to connect reef risk to human community dependence."

*[Transition to Shihab]*

"Now I'm going to hand it over to Shihab, who's going to walk you through what we actually found when we dug into this data."

---

## Q&A Prep: Science Questions Judges Might Ask

### Q1: "What's the difference between bleaching and mortality? Can bleached corals recover?"

**Answer:** "Great question. Bleaching is not immediately lethal -- it's a stress response. If temperatures return to normal within a few weeks, corals can reabsorb their symbiotic algae and recover. But if the heat stress persists -- which is increasingly the case with prolonged marine heat waves -- the coral starves and dies. The critical factor is duration. A short bleaching event might see 90 percent recovery. A prolonged one can cause 50 to 80 percent mortality. And even when corals recover from bleaching, they're weakened and more susceptible to disease."

### Q2: "Why not use the most recent data from 2020-2026, since the 4th Global Bleaching Event started in 2023?"

**Answer:** "We would absolutely want to include that data. The limitation is that the Global Coral Bleaching Database -- our primary dataset -- was published in 2022 with records through 2020. Comprehensive, quality-controlled bleaching observation data for 2021 through the present hasn't been consolidated into a single research-grade dataset yet. Real-time satellite data exists through NOAA Coral Reef Watch, but it measures thermal stress, not observed bleaching on the ground. That said, integrating the satellite data with our model is one of our stated next steps."

### Q3: "How does ocean acidification factor in? You focused on temperature but pH is also changing."

**Answer:** "You're right that ocean acidification is a major compounding threat. Rising CO2 levels lower ocean pH, which makes it harder for corals to build their calcium carbonate skeletons. However, the GCBD dataset focuses on thermal bleaching, and acidification operates on a slower, more chronic timescale than the acute bleaching events we're modeling. We flagged this as a limitation. Ideally, a more complete risk model would incorporate both thermal stress and acidification metrics, but for this analysis we scoped to thermal bleaching because that's where the data and the acute crisis are most concentrated."
