import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { MapPin, School, ShoppingCart, Hospital, TrendingUp, X } from 'lucide-react';
import { Button } from './ui/button';

interface SuburbData {
  name: string;
  color: string;
  position: { x: number; y: number };
  schools: string[];
  amenities: string[];
  marketTrends: {
    averagePrice: string;
    growth: string;
    demand: string;
  };
}

const benoniSuburbs: SuburbData[] = [
  {
    name: 'Rynfield',
    color: '#60A5FA',
    position: { x: 35, y: 40 },
    schools: ['Rynfield Primary School', 'Rynfield Secondary School', 'Crystal Park Primary'],
    amenities: ['Rynfield Terrace Shopping Centre', 'Lakeside Mall', 'Medical Centres', 'Parks & Recreation'],
    marketTrends: {
      averagePrice: 'R 1,450,000 - R 2,200,000',
      growth: '+5.2% annually',
      demand: 'High - Family friendly area'
    }
  },
  {
    name: 'Northmead',
    color: '#34D399',
    position: { x: 25, y: 55 },
    schools: ['Northmead Primary School', 'Benoni High School', 'Monument Primary'],
    amenities: ['Northmead Square', 'Benoni Country Club', 'Sports Facilities', 'Restaurants'],
    marketTrends: {
      averagePrice: 'R 1,200,000 - R 1,850,000',
      growth: '+4.8% annually',
      demand: 'High - Established neighborhood'
    }
  },
  {
    name: 'Lakefield',
    color: '#A78BFA',
    position: { x: 50, y: 30 },
    schools: ['Lakefield Primary School', 'Saheti School', 'St Dunstan\'s College'],
    amenities: ['Lakeside Mall', 'Bunny Park', 'Medical Facilities', 'Restaurants & Cafes'],
    marketTrends: {
      averagePrice: 'R 1,350,000 - R 2,100,000',
      growth: '+5.5% annually',
      demand: 'Very High - Premium location'
    }
  },
  {
    name: 'Crystal Park',
    color: '#F472B6',
    position: { x: 65, y: 50 },
    schools: ['Crystal Park Primary', 'Rynfield Secondary', 'Hoërskool Monument'],
    amenities: ['Crystal Park Centre', 'Parks & Recreation', 'Fitness Centers', 'Shopping'],
    marketTrends: {
      averagePrice: 'R 1,100,000 - R 1,750,000',
      growth: '+4.2% annually',
      demand: 'Moderate - Growing area'
    }
  },
  {
    name: 'Farrarmere',
    color: '#F59E0B',
    position: { x: 45, y: 65 },
    schools: ['Farrarmere Primary School', 'Benoni High School', 'St Anthony\'s School'],
    amenities: ['Farrarmere Shopping Centre', 'Community Parks', 'Medical Clinics', 'Sports Fields'],
    marketTrends: {
      averagePrice: 'R 950,000 - R 1,550,000',
      growth: '+4.5% annually',
      demand: 'High - Affordable family homes'
    }
  },
  {
    name: 'Brentwood Park',
    color: '#8B5CF6',
    position: { x: 20, y: 35 },
    schools: ['Brentwood Park Primary', 'Rynsoord Primary', 'King David High School'],
    amenities: ['Brentwood Centre', 'Benoni Lake', 'Golf Courses', 'Restaurants'],
    marketTrends: {
      averagePrice: 'R 1,500,000 - R 2,400,000',
      growth: '+5.8% annually',
      demand: 'Very High - Premium suburb'
    }
  }
];

const boksburgSuburbs: SuburbData[] = [
  {
    name: 'Sunward Park',
    color: '#FBBF24',
    position: { x: 30, y: 35 },
    schools: ['Sunward Park Primary School', 'Boksburg High School', 'Impala Park Primary'],
    amenities: ['East Rand Mall', 'Medical Centres', 'Parks', 'Sports Facilities'],
    marketTrends: {
      averagePrice: 'R 1,300,000 - R 1,950,000',
      growth: '+5.0% annually',
      demand: 'High - Family area'
    }
  },
  {
    name: 'Bartlett',
    color: '#FB923C',
    position: { x: 55, y: 45 },
    schools: ['Bartlett Primary School', 'Hoërskool Dinamika', 'St Benedict\'s School'],
    amenities: ['Carnival Mall', 'Hospitals', 'Shopping Centres', 'Recreation Areas'],
    marketTrends: {
      averagePrice: 'R 1,150,000 - R 1,700,000',
      growth: '+4.5% annually',
      demand: 'Moderate to High'
    }
  },
  {
    name: 'Bentel',
    color: '#A3E635',
    position: { x: 70, y: 60 },
    schools: ['Bentel Primary School', 'Boksburg Primary', 'Technical High Schools'],
    amenities: ['Boksburg CBD', 'Shopping Districts', 'Medical Facilities', 'Sports Clubs'],
    marketTrends: {
      averagePrice: 'R 950,000 - R 1,450,000',
      growth: '+3.8% annually',
      demand: 'Moderate - Affordable option'
    }
  },
  {
    name: 'Atlasville',
    color: '#14B8A6',
    position: { x: 40, y: 65 },
    schools: ['Atlasville Primary School', 'Laerskool Rynsoord', 'Boksburg High'],
    amenities: ['Local Shopping', 'Community Centres', 'Parks', 'Easy Highway Access'],
    marketTrends: {
      averagePrice: 'R 850,000 - R 1,350,000',
      growth: '+4.0% annually',
      demand: 'Steady - First-time buyers'
    }
  },
  {
    name: 'Parkdene',
    color: '#EC4899',
    position: { x: 25, y: 50 },
    schools: ['Parkdene Primary School', 'Hoërskool Alberton', 'St Dunstan\'s College'],
    amenities: ['Parkdene Shopping Centre', 'Parks & Trails', 'Medical Centres', 'Sports Clubs'],
    marketTrends: {
      averagePrice: 'R 1,200,000 - R 1,800,000',
      growth: '+5.2% annually',
      demand: 'High - Well-established area'
    }
  },
  {
    name: 'Delville',
    color: '#06B6D4',
    position: { x: 60, y: 30 },
    schools: ['Delville Primary School', 'Boksburg High School', 'Northmead Primary'],
    amenities: ['Delville Shopping', 'Community Facilities', 'Highway Access', 'Recreation Areas'],
    marketTrends: {
      averagePrice: 'R 1,050,000 - R 1,600,000',
      growth: '+4.3% annually',
      demand: 'Moderate - Growing interest'
    }
  }
];

export function InteractiveMap() {
  const [selectedSuburb, setSelectedSuburb] = useState<SuburbData | null>(null);
  const [activeCity, setActiveCity] = useState<'benoni' | 'boksburg'>('benoni');

  const currentSuburbs = activeCity === 'benoni' ? benoniSuburbs : boksburgSuburbs;

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-card rounded-lg">
            <MapPin className="h-8 w-8 text-white" />
          </div>
        </div>
        <h2 className="text-white">Interactive Suburb Map</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Explore neighborhoods with schools, amenities, and market insights
        </p>
      </div>

      {/* City Selector */}
      <div className="flex justify-center gap-4">
        <Button
          onClick={() => {
            setActiveCity('benoni');
            setSelectedSuburb(null);
          }}
          className={activeCity === 'benoni' ? 'bg-white text-black hover:bg-white/90' : 'bg-card hover:bg-card/80 text-white border border-border'}
        >
          Benoni Areas
        </Button>
        <Button
          onClick={() => {
            setActiveCity('boksburg');
            setSelectedSuburb(null);
          }}
          className={activeCity === 'boksburg' ? 'bg-white text-black hover:bg-white/90' : 'bg-card hover:bg-card/80 text-white border border-border'}
        >
          Boksburg Areas
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Interactive Map */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              {activeCity === 'benoni' ? 'Benoni' : 'Boksburg'} Neighborhoods
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative w-full aspect-square bg-background rounded-lg border border-border overflow-hidden">
              {/* Map Grid Background */}
              <div 
                className="absolute inset-0 opacity-5" 
                style={{
                  backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                  backgroundSize: '30px 30px'
                }}
              ></div>

              {/* Suburb Markers */}
              {currentSuburbs.map((suburb) => (
                <button
                  key={suburb.name}
                  onClick={() => setSelectedSuburb(suburb)}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                  style={{
                    left: `${suburb.position.x}%`,
                    top: `${suburb.position.y}%`
                  }}
                >
                  {/* Pulse Animation */}
                  <div 
                    className="absolute inset-0 rounded-full animate-ping opacity-75"
                    style={{ 
                      backgroundColor: suburb.color,
                      width: '24px',
                      height: '24px',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)'
                    }}
                  ></div>
                  
                  {/* Main Dot */}
                  <div 
                    className="relative w-6 h-6 rounded-full border-2 border-white shadow-lg group-hover:scale-125 transition-transform"
                    style={{ backgroundColor: suburb.color }}
                  ></div>

                  {/* Label */}
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <Badge 
                      className="text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity border"
                      style={{ 
                        backgroundColor: suburb.color,
                        color: '#000',
                        borderColor: suburb.color
                      }}
                    >
                      {suburb.name}
                    </Badge>
                  </div>
                </button>
              ))}

              {/* Instructions */}
              {!selectedSuburb && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center space-y-2 bg-black/50 backdrop-blur-sm p-6 rounded-lg">
                    <MapPin className="h-12 w-12 text-white/50 mx-auto" />
                    <p className="text-sm text-white/70">
                      Click on any colored dot to view suburb details
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Legend */}
            <div className="mt-4 p-4 bg-background rounded-lg border border-border">
              <p className="text-sm text-white mb-3">Suburbs:</p>
              <div className="flex flex-wrap gap-2">
                {currentSuburbs.map((suburb) => (
                  <button
                    key={suburb.name}
                    onClick={() => setSelectedSuburb(suburb)}
                    className="flex items-center gap-2 px-3 py-1 rounded-full bg-card hover:bg-card/80 border border-border transition-colors"
                  >
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: suburb.color }}
                    ></div>
                    <span className="text-xs text-white">{suburb.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Suburb Details */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <span>Suburb Information</span>
              {selectedSuburb && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setSelectedSuburb(null)}
                  className="text-white hover:bg-white/10"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedSuburb ? (
              <div className="space-y-6">
                {/* Suburb Name */}
                <div className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: selectedSuburb.color }}
                  ></div>
                  <div>
                    <h3 className="text-white">{selectedSuburb.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {activeCity === 'benoni' ? 'Benoni' : 'Boksburg'}
                    </p>
                  </div>
                </div>

                {/* Schools */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-white">
                    <School className="h-5 w-5" />
                    <span>Nearby Schools</span>
                  </div>
                  <ul className="space-y-2 ml-7">
                    {selectedSuburb.schools.map((school, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-white mt-1">•</span>
                        {school}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Amenities */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-white">
                    <ShoppingCart className="h-5 w-5" />
                    <span>Local Amenities</span>
                  </div>
                  <ul className="space-y-2 ml-7">
                    {selectedSuburb.amenities.map((amenity, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-white mt-1">•</span>
                        {amenity}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Market Trends */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-white">
                    <TrendingUp className="h-5 w-5" />
                    <span>Market Trends</span>
                  </div>
                  <div className="ml-7 space-y-2">
                    <div className="flex items-center justify-between py-2 border-b border-border">
                      <span className="text-sm text-muted-foreground">Average Price</span>
                      <span className="text-sm text-white">{selectedSuburb.marketTrends.averagePrice}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-border">
                      <span className="text-sm text-muted-foreground">Annual Growth</span>
                      <Badge className="bg-white/10 text-white border-0">
                        {selectedSuburb.marketTrends.growth}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-muted-foreground">Market Demand</span>
                      <span className="text-sm text-white">{selectedSuburb.marketTrends.demand}</span>
                    </div>
                  </div>
                </div>

                {/* Contact Button */}
                <Button 
                  onClick={() => {
                    const whatsappNumber = '27823146558';
                    const message = encodeURIComponent(`Hi! I'm interested in properties in ${selectedSuburb.name}, ${activeCity === 'benoni' ? 'Benoni' : 'Boksburg'}.`);
                    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
                  }}
                  className="w-full bg-white hover:bg-white/90 text-black"
                >
                  Inquire About {selectedSuburb.name}
                </Button>
              </div>
            ) : (
              <div className="py-16 text-center space-y-4">
                <Hospital className="h-16 w-16 text-muted-foreground mx-auto opacity-30" />
                <p className="text-muted-foreground">
                  Select a suburb on the map to view details about schools, amenities, and market trends
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Additional Info */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-white">Why These Areas?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <School className="h-8 w-8 text-white mb-3" />
              <h3 className="text-white">Quality Education</h3>
              <p className="text-sm text-muted-foreground">
                Access to excellent primary and secondary schools, from government to private institutions
              </p>
            </div>
            <div className="space-y-2">
              <ShoppingCart className="h-8 w-8 text-white mb-3" />
              <h3 className="text-white">Convenient Living</h3>
              <p className="text-sm text-muted-foreground">
                Shopping malls, medical facilities, and recreational areas all within easy reach
              </p>
            </div>
            <div className="space-y-2">
              <TrendingUp className="h-8 w-8 text-white mb-3" />
              <h3 className="text-white">Growing Investment</h3>
              <p className="text-sm text-muted-foreground">
                Steady property value growth with strong demand from families and professionals
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
