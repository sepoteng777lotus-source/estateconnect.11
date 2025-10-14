import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { School, ShoppingCart, Building2, TrendingUp, Users, MapPin, Check } from 'lucide-react';

interface SuburbData {
  name: string;
  schools: { name: string; type: string; rating: number }[];
  shopping: { name: string; distance: string }[];
  amenities: string[];
  demographics: {
    averageAge: string;
    familyFriendly: boolean;
    safetRating: number;
  };
  highlights: string[];
}

export function SuburbComparison() {
  const [selectedSuburb, setSelectedSuburb] = useState<'benoni' | 'boksburg'>('benoni');

  const suburbData: Record<'benoni' | 'boksburg', SuburbData> = {
    benoni: {
      name: 'Benoni',
      schools: [
        { name: 'Benoni High School', type: 'Public', rating: 4.2 },
        { name: 'Hoërskool Rynsoord', type: 'Public', rating: 4.5 },
        { name: 'Stirtonville Primary', type: 'Primary', rating: 4.0 },
        { name: 'Crystal Park Primary', type: 'Primary', rating: 4.3 }
      ],
      shopping: [
        { name: 'Lakeside Mall', distance: '3.5 km' },
        { name: 'Northmead Square', distance: '2.8 km' },
        { name: 'Benoni City Shopping Centre', distance: '1.5 km' }
      ],
      amenities: [
        'Multiple Parks & Recreation Areas',
        'Benoni Country Club',
        'Civic Theatre',
        'Benoni Lake',
        'Medical Centers & Hospitals',
        'Sports Facilities'
      ],
      demographics: {
        averageAge: '35-45',
        familyFriendly: true,
        safetRating: 3.8
      },
      highlights: [
        'Established residential areas',
        'Close to major highways (N12, R21)',
        'Rich in history and culture',
        'Growing property value',
        'Family-oriented community'
      ]
    },
    boksburg: {
      name: 'Boksburg',
      schools: [
        { name: 'Boksburg High School', type: 'Public', rating: 4.1 },
        { name: 'Hoërskool Dinamika', type: 'Public', rating: 4.4 },
        { name: 'Sunward Park Primary', type: 'Primary', rating: 4.2 },
        { name: 'Reiger Park Primary', type: 'Primary', rating: 3.9 }
      ],
      shopping: [
        { name: 'East Rand Mall', distance: '2.2 km' },
        { name: 'Festival Mall', distance: '4.0 km' },
        { name: 'Boksburg CBD', distance: '1.0 km' }
      ],
      amenities: [
        'Boksburg Lake',
        'Carnival City Casino & Entertainment',
        'Medical Facilities',
        'OR Tambo Airport Proximity (15km)',
        'Golf Courses',
        'Shopping Districts'
      ],
      demographics: {
        averageAge: '32-42',
        familyFriendly: true,
        safetRating: 3.9
      },
      highlights: [
        'Close to OR Tambo Airport',
        'Excellent highway access',
        'Diverse property options',
        'Growing commercial sector',
        'Entertainment & leisure facilities'
      ]
    }
  };

  const currentSuburb = suburbData[selectedSuburb];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-card rounded-lg">
            <MapPin className="h-8 w-8 text-white" />
          </div>
        </div>
        <h2 className="text-white">Suburb Comparison</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Compare amenities, schools, and neighborhood insights in Benoni and Boksburg
        </p>
      </div>

      <Tabs defaultValue="benoni" className="w-full" onValueChange={(value) => setSelectedSuburb(value as 'benoni' | 'boksburg')}>
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 bg-card">
          <TabsTrigger value="benoni" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            Benoni
          </TabsTrigger>
          <TabsTrigger value="boksburg" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            Boksburg
          </TabsTrigger>
        </TabsList>

        <TabsContent value={selectedSuburb} className="mt-8 space-y-6">
          {/* Highlights */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <TrendingUp className="h-5 w-5" />
                Key Highlights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentSuburb.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-white mt-0.5 flex-shrink-0" />
                    <span className="text-white">{highlight}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Schools */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <School className="h-5 w-5" />
                Schools & Education
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Top schools in {currentSuburb.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {currentSuburb.schools.map((school, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                    <div>
                      <p className="text-white">{school.name}</p>
                      <p className="text-sm text-muted-foreground">{school.type}</p>
                    </div>
                    <Badge variant="secondary" className="bg-secondary text-white">
                      ★ {school.rating}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Shopping Centers */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <ShoppingCart className="h-5 w-5" />
                Shopping Centers
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Major shopping destinations nearby
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {currentSuburb.shopping.map((center, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                    <p className="text-white">{center.name}</p>
                    <span className="text-muted-foreground">{center.distance}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Amenities */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Building2 className="h-5 w-5" />
                Local Amenities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentSuburb.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="h-2 w-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-white">{amenity}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Demographics */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Users className="h-5 w-5" />
                Neighborhood Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-background rounded-lg border border-border">
                  <p className="text-sm text-muted-foreground mb-2">Average Age</p>
                  <p className="text-xl text-white">{currentSuburb.demographics.averageAge}</p>
                </div>
                <div className="text-center p-4 bg-background rounded-lg border border-border">
                  <p className="text-sm text-muted-foreground mb-2">Family Friendly</p>
                  <p className="text-xl text-white">
                    {currentSuburb.demographics.familyFriendly ? 'Yes' : 'No'}
                  </p>
                </div>
                <div className="text-center p-4 bg-background rounded-lg border border-border">
                  <p className="text-sm text-muted-foreground mb-2">Safety Rating</p>
                  <p className="text-xl text-white">★ {currentSuburb.demographics.safetRating}/5</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
