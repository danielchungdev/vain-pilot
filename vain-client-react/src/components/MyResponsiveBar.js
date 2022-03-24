import React from 'react';
import { ResponsiveBar } from '@nivo/bar'

const MyResponsiveBar = () => {
  const data = [
    {
      "country": "AD",
      "hot dog": 161,
      "hot dogColor": "hsl(81, 70%, 50%)",
      "burger": 199,
      "burgerColor": "hsl(308, 70%, 50%)",
      "sandwich": 19,
      "sandwichColor": "hsl(65, 70%, 50%)",
      "kebab": 191,
      "kebabColor": "hsl(339, 70%, 50%)",
      "fries": 127,
      "friesColor": "hsl(159, 70%, 50%)",
      "donut": 52,
      "donutColor": "hsl(336, 70%, 50%)"
    },
    {
      "country": "AE",
      "hot dog": 41,
      "hot dogColor": "hsl(247, 70%, 50%)",
      "burger": 102,
      "burgerColor": "hsl(116, 70%, 50%)",
      "sandwich": 157,
      "sandwichColor": "hsl(289, 70%, 50%)",
      "kebab": 12,
      "kebabColor": "hsl(100, 70%, 50%)",
      "fries": 140,
      "friesColor": "hsl(162, 70%, 50%)",
      "donut": 96,
      "donutColor": "hsl(246, 70%, 50%)"
    },
    {
      "country": "AF",
      "hot dog": 130,
      "hot dogColor": "hsl(59, 70%, 50%)",
      "burger": 38,
      "burgerColor": "hsl(36, 70%, 50%)",
      "sandwich": 22,
      "sandwichColor": "hsl(265, 70%, 50%)",
      "kebab": 78,
      "kebabColor": "hsl(313, 70%, 50%)",
      "fries": 161,
      "friesColor": "hsl(133, 70%, 50%)",
      "donut": 68,
      "donutColor": "hsl(214, 70%, 50%)"
    },
    {
      "country": "AG",
      "hot dog": 177,
      "hot dogColor": "hsl(49, 70%, 50%)",
      "burger": 196,
      "burgerColor": "hsl(285, 70%, 50%)",
      "sandwich": 170,
      "sandwichColor": "hsl(160, 70%, 50%)",
      "kebab": 185,
      "kebabColor": "hsl(85, 70%, 50%)",
      "fries": 74,
      "friesColor": "hsl(314, 70%, 50%)",
      "donut": 166,
      "donutColor": "hsl(174, 70%, 50%)"
    },
    {
      "country": "AI",
      "hot dog": 49,
      "hot dogColor": "hsl(25, 70%, 50%)",
      "burger": 12,
      "burgerColor": "hsl(144, 70%, 50%)",
      "sandwich": 116,
      "sandwichColor": "hsl(270, 70%, 50%)",
      "kebab": 157,
      "kebabColor": "hsl(242, 70%, 50%)",
      "fries": 83,
      "friesColor": "hsl(25, 70%, 50%)",
      "donut": 156,
      "donutColor": "hsl(57, 70%, 50%)"
    },
    {
      "country": "AL",
      "hot dog": 200,
      "hot dogColor": "hsl(48, 70%, 50%)",
      "burger": 152,
      "burgerColor": "hsl(9, 70%, 50%)",
      "sandwich": 54,
      "sandwichColor": "hsl(134, 70%, 50%)",
      "kebab": 73,
      "kebabColor": "hsl(195, 70%, 50%)",
      "fries": 179,
      "friesColor": "hsl(313, 70%, 50%)",
      "donut": 132,
      "donutColor": "hsl(81, 70%, 50%)"
    },
    {
      "country": "AM",
      "hot dog": 192,
      "hot dogColor": "hsl(171, 70%, 50%)",
      "burger": 50,
      "burgerColor": "hsl(252, 70%, 50%)",
      "sandwich": 125,
      "sandwichColor": "hsl(117, 70%, 50%)",
      "kebab": 200,
      "kebabColor": "hsl(161, 70%, 50%)",
      "fries": 38,
      "friesColor": "hsl(148, 70%, 50%)",
      "donut": 6,
      "donutColor": "hsl(235, 70%, 50%)"
    }
  ]
  return(
  <ResponsiveBar
      data={data}
      keys={[
          'hot dog',
          'burger',
          'sandwich',
          'kebab',
          'fries',
          'donut'
      ]}
      indexBy="country"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={{ scheme: 'nivo' }}
      defs={[
          {
              id: 'dots',
              type: 'patternDots',
              background: 'inherit',
              color: '#38bcb2',
              size: 4,
              padding: 1,
              stagger: true
          },
          {
              id: 'lines',
              type: 'patternLines',
              background: 'inherit',
              color: '#eed312',
              rotation: -45,
              lineWidth: 6,
              spacing: 10
          }
      ]}
      fill={[
          {
              match: {
                  id: 'fries'
              },
              id: 'dots'
          },
          {
              match: {
                  id: 'sandwich'
              },
              id: 'lines'
          }
      ]}
      borderColor={{
          from: 'color',
          modifiers: [
              [
                  'darker',
                  1.6
              ]
          ]
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'country',
          legendPosition: 'middle',
          legendOffset: 32
      }}
      axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'food',
          legendPosition: 'middle',
          legendOffset: -40
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
          from: 'color',
          modifiers: [
              [
                  'darker',
                  1.6
              ]
          ]
      }}
      legends={[
          {
              dataFrom: 'keys',
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: 'left-to-right',
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                  {
                      on: 'hover',
                      style: {
                          itemOpacity: 1
                      }
                  }
              ]
          }
      ]}
      role="application"
      ariaLabel="Nivo bar chart demo"
      barAriaLabel={function(e){return e.id+": "+e.formattedValue+" in country: "+e.indexValue}}
  />
  )}

  export default MyResponsiveBar;