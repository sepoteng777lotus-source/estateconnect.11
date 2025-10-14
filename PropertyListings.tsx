import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Home, Bed, Bath, Maximize, MapPin, Plus, Trash2, Edit, Upload, X, Image as ImageIcon } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  size: string;
  description: string;
  images: string[];
}

export function PropertyListings() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [showListings, setShowListings] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    size: '',
    description: ''
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setUploadedImages(prev => [...prev, result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (uploadedImages.length === 0) {
      alert('Please add at least one image');
      return;
    }
    
    if (editingProperty) {
      // Update existing property
      setProperties(properties.map(p => 
        p.id === editingProperty.id 
          ? {
              ...editingProperty,
              ...formData,
              bedrooms: parseInt(formData.bedrooms),
              bathrooms: parseInt(formData.bathrooms),
              images: uploadedImages
            }
          : p
      ));
      setEditingProperty(null);
    } else {
      // Add new property
      const newProperty: Property = {
        id: Date.now().toString(),
        ...formData,
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseInt(formData.bathrooms),
        images: uploadedImages
      };
      setProperties([...properties, newProperty]);
    }
    
    // Reset form
    setFormData({
      title: '',
      location: '',
      price: '',
      bedrooms: '',
      bathrooms: '',
      size: '',
      description: ''
    });
    setUploadedImages([]);
    setIsDialogOpen(false);
  };

  const handleEdit = (property: Property) => {
    setEditingProperty(property);
    setFormData({
      title: property.title,
      location: property.location,
      price: property.price,
      bedrooms: property.bedrooms.toString(),
      bathrooms: property.bathrooms.toString(),
      size: property.size,
      description: property.description
    });
    setUploadedImages(property.images);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setProperties(properties.filter(p => p.id !== id));
  };

  const handleWhatsAppInquiry = (property: Property) => {
    const whatsappNumber = '27823146558';
    const message = encodeURIComponent(`Hi! I'm interested in the property: ${property.title} in ${property.location} listed at ${property.price}`);
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-card rounded-lg">
            <Home className="h-8 w-8 text-white" />
          </div>
        </div>
        <h2 className="text-white">Current Property Listings</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Available properties in Benoni and Boksburg
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={() => setShowListings(!showListings)}
            className="bg-card hover:bg-card/80 text-white border border-border"
          >
            {showListings ? 'Hide Listings' : 'Show Available Properties'}
          </Button>
          
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) {
              setEditingProperty(null);
              setFormData({
                title: '',
                location: '',
                price: '',
                bedrooms: '',
                bathrooms: '',
                size: '',
                description: ''
              });
              setUploadedImages([]);
            }
          }}>
            <DialogTrigger asChild>
              <Button className="bg-white hover:bg-white/90 text-black">
                <Plus className="mr-2 h-4 w-4" />
                Add New Listing
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border text-white max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-white">
                  {editingProperty ? 'Edit Property Listing' : 'Add New Property Listing'}
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Fill in the property details below. This listing will be visible to potential buyers.
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  {/* Image Upload Section */}
                  <div className="space-y-3">
                    <Label className="text-white">Property Images *</Label>
                    <div className="space-y-3">
                      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-white/30 transition-colors">
                        <input
                          type="file"
                          id="image-upload"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <label htmlFor="image-upload" className="cursor-pointer">
                          <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                          <p className="text-white mb-1">Click to upload images</p>
                          <p className="text-xs text-muted-foreground">
                            PNG, JPG, WEBP up to 10MB each (multiple files allowed)
                          </p>
                        </label>
                      </div>

                      {uploadedImages.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {uploadedImages.map((image, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={image}
                                alt={`Upload ${index + 1}`}
                                className="w-full h-32 object-cover rounded-lg border border-border"
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-2 right-2 p-1 bg-destructive rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="h-4 w-4 text-white" />
                              </button>
                              {index === 0 && (
                                <Badge className="absolute bottom-2 left-2 bg-white text-black text-xs">
                                  Main
                                </Badge>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-white">Property Title *</Label>
                    <Input
                      id="title"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g., Beautiful 3 Bedroom Family Home"
                      className="bg-input-background border-border text-white placeholder:text-muted-foreground"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-white">Location *</Label>
                    <Input
                      id="location"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g., Rynfield, Benoni"
                      className="bg-input-background border-border text-white placeholder:text-muted-foreground"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price" className="text-white">Price *</Label>
                      <Input
                        id="price"
                        required
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        placeholder="e.g., R 1,850,000"
                        className="bg-input-background border-border text-white placeholder:text-muted-foreground"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="size" className="text-white">Property Size *</Label>
                      <Input
                        id="size"
                        required
                        value={formData.size}
                        onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                        placeholder="e.g., 250 m²"
                        className="bg-input-background border-border text-white placeholder:text-muted-foreground"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bedrooms" className="text-white">Bedrooms *</Label>
                      <Input
                        id="bedrooms"
                        type="number"
                        required
                        min="1"
                        value={formData.bedrooms}
                        onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                        placeholder="3"
                        className="bg-input-background border-border text-white placeholder:text-muted-foreground"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bathrooms" className="text-white">Bathrooms *</Label>
                      <Input
                        id="bathrooms"
                        type="number"
                        required
                        min="1"
                        value={formData.bathrooms}
                        onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                        placeholder="2"
                        className="bg-input-background border-border text-white placeholder:text-muted-foreground"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-white">Description *</Label>
                    <Textarea
                      id="description"
                      required
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe the property, its features, and nearby amenities..."
                      className="bg-input-background border-border text-white placeholder:text-muted-foreground"
                    />
                  </div>
                </div>

                <div className="flex gap-3 justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsDialogOpen(false);
                      setEditingProperty(null);
                      setFormData({
                        title: '',
                        location: '',
                        price: '',
                        bedrooms: '',
                        bathrooms: '',
                        size: '',
                        description: ''
                      });
                      setUploadedImages([]);
                    }}
                    className="bg-transparent border-border text-white hover:bg-white/10"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-white hover:bg-white/90 text-black">
                    {editingProperty ? 'Update Listing' : 'Add Listing'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {showListings && (
        <div className="space-y-6">
          {properties.length === 0 ? (
            <Card className="bg-card border-border">
              <CardContent className="py-16 text-center">
                <Home className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-white mb-2">No Properties Listed</p>
                <p className="text-muted-foreground">
                  Click "Add New Listing" to add your first property
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <Card key={property.id} className="bg-card border-border overflow-hidden group hover:border-white/30 transition-all">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {property.images.length > 1 && (
                      <Badge className="absolute bottom-3 left-3 bg-black/70 text-white border-0">
                        <ImageIcon className="h-3 w-3 mr-1" />
                        {property.images.length} photos
                      </Badge>
                    )}
                    <div className="absolute top-3 right-3 flex gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleEdit(property)}
                        className="bg-black/70 hover:bg-black/90 text-white border-0 h-8 w-8 p-0"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(property.id)}
                        className="bg-destructive/70 hover:bg-destructive text-white border-0 h-8 w-8 p-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-white line-clamp-1">{property.title}</CardTitle>
                      <Badge className="bg-white text-black shrink-0">
                        {property.price}
                      </Badge>
                    </div>
                    <CardDescription className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {property.location}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4 text-sm text-white">
                      <div className="flex items-center gap-1">
                        <Bed className="h-4 w-4" />
                        <span>{property.bedrooms} Bed</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="h-4 w-4" />
                        <span>{property.bathrooms} Bath</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Maximize className="h-4 w-4" />
                        <span>{property.size}</span>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {property.description}
                    </p>

                    <Button
                      onClick={() => handleWhatsAppInquiry(property)}
                      className="w-full bg-white hover:bg-white/90 text-black"
                    >
                      Inquire via WhatsApp
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
