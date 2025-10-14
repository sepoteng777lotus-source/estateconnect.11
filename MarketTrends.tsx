import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { TrendingUp, TrendingDown, Home, DollarSign, Calendar } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export function MarketTrends() {
  const [selectedArea, setSelectedArea] = useState<'benoni' | 'boksburg'>('benoni');

  const marketData = {
    benoni: {
      name: 'Benoni',
      averagePrice: 'R 1,850,000',
      priceChange: '+5.2%',
      trend: 'up' as const,
      timeToSell: '45 days',
      demandLevel: 'High',
      priceHistory: [
        { month: 'Apr', price: 1720 },
        { month: 'May', price: 1750 },
        { month: 'Jun', price: 1780 },
        { month: 'Jul', price: 1810 },
        { month: 'Aug', price: 1830 },
        { month: 'Sep', price: 1850 }
      ],
      propertyTypes: [
        { type: 'Houses', average: 2100, count: 145 },
        { type: 'Townhouses', average: 1600, count: 89 },
        { type: 'Apartments', average: 950, count: 52 }
      ],
      insights: [
        'Strong demand for family homes',
        'Property values increasing steadily',
        'Good schools driving interest',
        'First-time buyers market'
      ]
    },
    boksburg: {
      name: 'Boksburg',
      averagePrice: 'R 1,720,000',
      priceChange: '+4.8%',
      trend: 'up' as const,
      timeToSell: '52 days',
      demandLevel: 'Medium-High',
      priceHistory: [
        { month: 'Apr', price: 1620 },
        { month: 'May', price: 1650 },
        { month: 'Jun', price: 1670 },
        { month: 'Jul', price: 1690 },
        { month: 'Aug', price: 1710 },
        { month: 'Sep', price: 1720 }
      ],
      propertyTypes: [
        { type: 'Houses', average: 1950, count: 132 },
        { type: 'Townhouses', average: 1500, count: 98 },
        { type: 'Apartments', average: 880, count: 61 }
      ],
      insights: [
        'Airport proximity adds value',
        'Steady price appreciation',
        'Mix of residential & commercial',
        'Growing investor interest'
      ]
    }
  };

  const currentData = marketData[selectedArea];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-card rounded-lg">
            <TrendingUp className="h-8 w-8 text-white" />
          </div>
        </div>
        <h2 className="text-white">Market Trends & Analysis</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Real-time property market insights for informed decisions
        </p>
      </div>

      <Tabs defaultValue="benoni" className="w-full" onValueChange={(value) => setSelectedArea(value as 'benoni' | 'boksburg')}>
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 bg-card">
          <TabsTrigger value="benoni" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            Benoni
          </TabsTrigger>
          <TabsTrigger value="boksburg" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            Boksburg
          </TabsTrigger>
        </TabsList>

        <TabsContent value={selectedArea} className="mt-8 space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <DollarSign className="h-5 w-5 text-white" />
                  {currentData.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 text-green-400" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-400" />
                  )}
                </div>
                <p className="text-2xl text-white mb-1">{currentData.averagePrice}</p>
                <p className="text-sm text-muted-foreground">Average Price</p>
                <Badge variant="secondary" className="mt-2 bg-green-900/30 text-green-400 border-green-400/30">
                  {currentData.priceChange}
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <Calendar className="h-5 w-5 text-white mb-2" />
                <p className="text-2xl text-white mb-1">{currentData.timeToSell}</p>
                <p className="text-sm text-muted-foreground">Avg. Time to Sell</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <TrendingUp className="h-5 w-5 text-white mb-2" />
                <p className="text-2xl text-white mb-1">{currentData.demandLevel}</p>
                <p className="text-sm text-muted-foreground">Market Demand</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <Home className="h-5 w-5 text-white mb-2" />
                <p className="text-2xl text-white mb-1">
                  {currentData.propertyTypes.reduce((acc, curr) => acc + curr.count, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Active Listings</p>
              </CardContent>
            </Card>
          </div>

          {/* Price Trend Chart */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-white">6-Month Price Trend</CardTitle>
              <CardDescription className="text-muted-foreground">
                Average property prices in {currentData.name} (in thousands)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={currentData.priceHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" stroke="#FFFFFF" />
                  <YAxis stroke="#FFFFFF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#2A2A2A', 
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '8px',
                      color: '#FFFFFF'
                    }}
                    formatter={(value) => [`R ${value}k`, 'Avg Price']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#FFFFFF" 
                    strokeWidth={2}
                    dot={{ fill: '#FFFFFF', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Property Types */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-white">Property Types & Prices</CardTitle>
              <CardDescription className="text-muted-foreground">
                Average prices by property type (in thousands)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={currentData.propertyTypes}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="type" stroke="#FFFFFF" />
                  <YAxis stroke="#FFFFFF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#2A2A2A', 
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '8px',
                      color: '#FFFFFF'
                    }}
                    formatter={(value, name) => {
                      if (name === 'average') return [`R ${value}k`, 'Avg Price'];
                      if (name === 'count') return [value, 'Listings'];
                      return value;
                    }}
                  />
                  <Legend />
                  <Bar dataKey="average" fill="#FFFFFF" name="Avg Price" />
                  <Bar dataKey="count" fill="#808080" name="Listings" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Market Insights */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-white">Market Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentData.insights.map((insight, index) => (
                  <div key={index} className="flex items-start gap-2 p-3 bg-background rounded-lg border border-border">
                    <TrendingUp className="h-5 w-5 text-white mt-0.5 flex-shrink-0" />
                    <span className="text-white">{insight}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
