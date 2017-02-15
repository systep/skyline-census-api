# census scrapers

This project contains some logic to be able to scrape quick facts from the US census website. The US census contains both CSV
versions of census data and a website where some insights have been already derived from digesting that data.

The following project exposes an API to the quick info based on <city, state> input. 

The project basically does the following to achieve this API:
- Mapping an address string to FIPS code to be able to search for data
- Scraping census web pages
- Cleaning the scraped data to provide a readable JSON

## running the project

To run the project:

```bash
cd scrapers && swagger project start
```

To edit the project's API endpoints:
```
cd scrapers && swagger project edit
```

## sample request / response:

request:
```bash
curl http://localhost:10010/population?fullCityName=phoenix&shortStateName=az
```

response:
```bash
{
	"Population estimates, July 1, 2016,  (V2016)": "NA",
	"Population estimates, July 1, 2015,  (V2015)": "1,563,025",
	"Population estimates base, April 1, 2010,  (V2016)": "NA",
	"Population estimates base, April 1, 2010,  (V2015)": "1,447,624",
	"Population, percent change - April 1, 2010 (estimates base) to July 1, 2016,  (V2016)": "NA",
	"Population, percent change - April 1, 2010 (estimates base) to July 1, 2015,  (V2015)": "8.0%",
	"Population, Census, April 1, 2010": "1,445,632",
	"Persons under 5 years, percent, July 1, 2015,  (V2015)": "X",
	"Persons under 5 years, percent, April 1, 2010": "8.3%",
	"Persons under 18 years, percent, July 1, 2015,  (V2015)": "X",
	"Persons under 18 years, percent, April 1, 2010": "28.2%",
	"Persons 65 years and over, percent,  July 1, 2015,  (V2015)": "X",
	"Persons 65 years and over, percent, April 1, 2010": "8.4%",
	"Female persons, percent,  July 1, 2015,  (V2015)": "X",
	"Female persons, percent, April 1, 2010": "49.8%",
	"White alone, percent, July 1, 2015,  (V2015)": "X",
	"White alone, percent, April 1, 2010": "65.9%",
	"Black or African American alone, percent, July 1, 2015,  (V2015)": "X",
	"Black or African American alone, percent, April 1, 2010": "6.5%",
	"American Indian and Alaska Native alone, percent, July 1, 2015,  (V2015)": "X",
	"American Indian and Alaska Native alone, percent, April 1, 2010": "2.2%",
	"Asian alone, percent, July 1, 2015,  (V2015)": "X",
	"Asian alone, percent, April 1, 2010": "3.2%",
	"Native Hawaiian and Other Pacific Islander alone, percent, July 1, 2015,  (V2015)": "X",
	"Native Hawaiian and Other Pacific Islander alone, percent, April 1, 2010": "0.2%",
	"Two or More Races, percent, July 1, 2015,  (V2015)": "X",
	"Two or More Races, percent, April 1, 2010": "3.6%",
	"Hispanic or Latino, percent, July 1, 2015,  (V2015)": "X",
	"Hispanic or Latino, percent, April 1, 2010": "40.8%",
	"White alone, not Hispanic or Latino, percent, July 1, 2015,  (V2015)": "X",
	"White alone, not Hispanic or Latino, percent, April 1, 2010": "46.5%",
	"Veterans, 2011-2015": "74,708",
	"Foreign born persons, percent, 2011-2015": "20.0%",
	"Housing units,  July 1, 2015,  (V2015)": "X",
	"Housing units, April 1, 2010": "590,149",
	"Owner-occupied housing unit rate, 2011-2015": "53.0%",
	"Median value of owner-occupied housing units, 2011-2015": "$163,400",
	"Median selected monthly owner costs -with a mortgage, 2011-2015": "$1,349",
	"Median selected monthly owner costs -without a mortgage, 2011-2015": "$425",
	"Median gross rent, 2011-2015": "$884",
	"Building permits, 2015": "X",
	"Households, 2011-2015": "525,610",
	"Persons per household, 2011-2015": "2.85",
	"Living in same house 1 year ago, percent of persons age 1 year+, 2011-2015": "80.9%",
	"Language other than English spoken at home, percent of persons age 5 years+, 2011-2015": "37.0%",
	"High school graduate or higher, percent of persons age 25 years+, 2011-2015": "80.7%",
	"Bachelor's degree or higher, percent of persons age 25 years+, 2011-2015": "26.7%",
	"With a disability, under age 65 years, percent, 2011-2015": "7.2%",
	"Persons  without health insurance, under age 65 years, percent": "22.2%",
	"In civilian labor force, total, percent of population age 16 years+, 2011-2015": "65.5%",
	"In civilian labor force, female, percent of population age 16 years+, 2011-2015": "59.3%",
	"Total accommodation and food services sales, 2012 ($1,000)": "3,479,625",
	"Total health care and social assistance receipts/revenue, 2012 ($1,000)": "10,967,040",
	"Total manufacturers shipments, 2012 ($1,000)": "12,978,949",
	"Total merchant wholesaler sales, 2012 ($1,000)   ": "31,193,680",
	"Total retail sales, 2012 ($1,000)": "18,448,380",
	"Total retail sales per capita, 2012": "$12,392",
	"Mean travel time to work (minutes), workers age 16 years+, 2011-2015": "24.8",
	"Median household income (in 2015 dollars), 2011-2015": "$47,326",
	"Per capita income in past 12 months (in 2015 dollars), 2011-2015": "$24,231",
	"Persons in poverty, percent": "23.1%",
	"Total employer establishments, 2014": "X",
	"Total employment, 2014": "X",
	"Total annual payroll, 2014 ($1,000)": "X",
	"Total employment, percent change, 2013-2014": "X",
	"Total nonemployer establishments, 2014": "X",
	"All firms, 2012": "124,033",
	"Men-owned firms, 2012": "63,479",
	"Women-owned firms, 2012": "44,294",
	"Minority-owned firms, 2012": "39,596",
	"Nonminority-owned firms, 2012": "78,757",
	"Veteran-owned firms, 2012": "10,784",
	"Nonveteran-owned firms, 2012": "106,575",
	"Population per square mile, 2010": "2,797.8",
	"Land area in square miles, 2010": "516.70",
	"Metropolitan or Micropolitan Statistical Area": "None",
	"FIPS Code": "0455000"
}
```