// Annotations shown in each section.
//
//   figure  'vote-share'   Section I: shown above the state's line chart
//                          in the detail panel, pointing at `year`
//           'independents' Section II: hover tooltip, star on the map
//           'competitive'  Section III: hover tooltip, star on the tile
//           'ballot'       Section IV: hover tooltip, star by the state name
//           'registration' Section V: hover tooltip, star on the map
//   state   full state name, as spelled in the data
//   year    Section I only
//   text    plain text
const ANNOTATIONS = [
  // ---- Section I: Presidential vote share --------------------------------
  {
    figure: 'vote-share',
    state: 'Utah',
    year: 2016,
    text: 'Utah-based independent candidate Evan McMullin received an outsized share (21.5%) of the vote in 2016. He ran with the explicit objective to win Utah and prevent either major party candidate from reaching 270 electoral votes.'
  },
   {
    figure: 'vote-share',
    state: 'Utah',
    year: 1992,
    text: 'Independent Ross Perot finished in 2nd place in 1992, ahead of Democratic candidate Bill Clinton.'
  },
   {
    figure: 'vote-share',
    state: 'Maine',
    year: 1992,
    text: "Independent Ross Perot finished in 2nd place in 1992, ahead of Republican candidate George H.W. Bush. 1992 marks the last presidential election where a third party candidate finished ahead of a major party's nominee in any state."
  },
   {
    figure: 'vote-share',
    state: 'Florida',
    year: 2000,
    text: "In Florida in 2000, Republican candidate George W. Bush beat Democrat Al Gore by only 537 votes out of almost 6 million cast ballots (a margin of 0.009%). Third party candidates garnered around 138,000 votes (or about 2.3% of the total Florida vote). The leading third party candidate was Ralph Nader of the Green Party, who captured over 97,000 votes."
  },
  
  // ---- Section II: Independent identifiers -------------------------------
  {
    figure: 'independents',
    state: 'Maine',
    text: 'Maine has elected independent senator Angus King in each election since 2012. King also won the governorship in 1994 and 1998. He caucuses with the Democratic Party.'
  },
  {
    figure: 'independents',
    state: 'Minnesota',
    text: "Jesse Ventura of the Reform Party won the Minnesota governorship in 1998, garnering 37% of the vote to his Republican and Democratic opposition's 34.3% and 28.1%."
  },
  {
    figure: 'independents',
    state: 'Alaska',
    text: "Wally Hickel of the Alaskan Independence Party won the governorship against Republican and Democratic opposition in 1990, while Democratic-allied candidate Bill Walker defeated Republican incumbent Sean Parnell in 2014. While still a registered Republican, Lisa Murkowski won re-election to the Senate in 2010 with a write-in campaign after losing in the Republican primary."
  },
  {
    figure: 'independents',
    state: 'Connecticut',
    text: 'Lowell Weicker formed the "A Connecticut Party" and won the 1990 Connecticut gubernatorial election against Republican and Democratic opposition. The party name was strategically chosen to appear alphabetically at the top of the ballot. In 2006, after losing the Democratic primary, incumbent senator Joe Lieberman won re-election as an independent.'
  },
  {
    figure: 'independents',
    state: 'Rhode Island',
    text: 'Lincoln Chafee won the governorship in 2010 as an independent. He had previously served as a Republican senator, later joined the Democratic Party after his election in 2013, and ultimately switched to the Libertarian Party in 2019.'
  },
  {
    figure: 'independents',
    state: 'Vermont',
    text: 'Vermont has elected independent senator Bernie Sanders in each election since 2006. Sanders caucuses with the Democratic Party, and ran to be the Democratic presidential nominee in 2016 and 2020.'
  },

  // ---- Section V: Voter registration -------------------------------------
  {
    figure: 'registration',
    state: 'North Dakota',
    text: 'North Dakota is the only state without voter registration. Eligible residents vote by showing identification at the polls.'
  },
  {
    figure: 'registration',
    state: 'North Carolina',
    text: 'North Carolina’s regular registration deadline was Oct. 11, though eligible residents could also register and vote in person at early-voting sites through Nov. 2.'
  },
  {
    figure: 'registration',
    state: 'Rhode Island',
    text: 'Rhode Island allows Election Day registration for presidential voting only. Voters who register on Election Day may vote in the presidential race but not for other offices.'
  },
];
