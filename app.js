import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dog, Sparkles, Heart, Shield, Target, Flame } from 'lucide-react';

const DogNameGenerator = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [generatedName, setGeneratedName] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);

  const dogNames = {
    cute: ['Bolinha', 'Pipoca', 'Biscoito', 'Docinho', 'Fofinho', 'Algodão', 'Marshmallow'],
    fierce: ['Brutus', 'Thor', 'Titan', 'Rex', 'Zeus', 'Kratos', 'Hades'],
    hunter: ['Hunter', 'Scout', 'Ranger', 'Wolf', 'Falcon', 'Hawk', 'Arrow'],
    loving: ['Mimo', 'Dengoso', 'Bebê', 'Fofucho', 'Xodó', 'Neném', 'Princesa'],
    guardian: ['Guardian', 'Atlas', 'Odin', 'Knight', 'Shield', 'Sentinel', 'Warrior']
  };

  const categories = [
    { id: 'cute', icon: Heart, label: 'Fofinhos', color: 'pink' },
    { id: 'fierce', icon: Flame, label: 'Raivosos', color: 'red' },
    { id: 'hunter', icon: Target, label: 'Caçadores', color: 'green' },
    { id: 'loving', icon: Heart, label: 'Dengosos', color: 'purple' },
    { id: 'guardian', icon: Shield, label: 'Protetores', color: 'blue' }
  ];

  const generateName = async () => {
    if (!selectedCategory) return;
    
    setIsGenerating(true);
    setShowSparkles(false);
    
    // Simular efeito de "pensando"
    for (let i = 0; i < 5; i++) {
      setGeneratedName(dogNames[selectedCategory][Math.floor(Math.random() * dogNames[selectedCategory].length)]);
      await new Promise(r => setTimeout(r, 100));
    }
    
    // Nome final
    const finalName = dogNames[selectedCategory][Math.floor(Math.random() * dogNames[selectedCategory].length)];
    setGeneratedName(finalName);
    setIsGenerating(false);
    setShowSparkles(true);
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'cute': return 'bg-pink-500 hover:bg-pink-600';
      case 'fierce': return 'bg-red-500 hover:bg-red-600';
      case 'hunter': return 'bg-green-500 hover:bg-green-600';
      case 'loving': return 'bg-purple-500 hover:bg-purple-600';
      case 'guardian': return 'bg-blue-500 hover:bg-blue-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const SparkleEffect = () => (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className={`
            absolute w-2 h-2 bg-yellow-300 rounded-full
            animate-ping opacity-0
          `}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${1 + Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8">
      <Card className="max-w-2xl mx-auto bg-white/90 backdrop-blur-lg shadow-xl">
        <CardContent className="p-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-8">
              <Dog className="h-8 w-8 text-purple-500 animate-bounce" />
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                Gerador de Nomes de Cachorro
              </h1>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant="outline"
                  className={`w-full h-20 transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                    selectedCategory === category.id ? getCategoryColor(category.id) + ' text-white' : ''
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <category.icon className="mr-2 h-6 w-6" />
                  {category.label}
                </Button>
              ))}
            </div>

            <Button
              className="w-64 h-12 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold
                         transition-all duration-300 transform hover:scale-105 active:scale-95"
              onClick={generateName}
              disabled={!selectedCategory || isGenerating}
            >
              {isGenerating ? (
                <div className="flex items-center">
                  <Sparkles className="animate-spin mr-2" />
                  Gerando...
                </div>
              ) : (
                'Gerar Nome'
              )}
            </Button>

            {generatedName && (
              <div className="relative mt-8 p-4">
                {showSparkles && <SparkleEffect />}
                <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r 
                              from-purple-500 to-pink-500 animate-bounce">
                  ✨ {generatedName} ✨
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DogNameGenerator;
