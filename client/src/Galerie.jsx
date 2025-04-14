import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "./components/Layout/Layout";

const schoolImages = [
  {
    id: 1,
    src: "/images/school1.jpg",
    alt: "Grand Island Senior High School - hlavní budova",
    caption: "Hlavní budova školy"
  },
  {
    id: 2,
    src: "/images/school2.jpg",
    alt: "Grand Island Senior High School - Tělocvična",
    caption: "Moderní tělocvična"
  },
  {
    id: 3,
    src: "/images/school3.jpg",
    alt: "Grand Island Senior High School - Školní posliovna",
    caption: "Školní posilovna"
  },
  {
    id: 4,
    src: "/images/school4.jpg", 
    alt: "Grand Island Senior High School - Fotbalové hřiště",
    caption: "Sportovní areál"
  }
];

const cityImages = [
  {
    id: 1,
    src: "/images/city1-downtown.jpg",
    alt: "Grand Island - centrum města",
    caption: "Centrum města Grand Island"
  },
  {
    id: 2,
    src: "/images/city2-museum.jpg",
    alt: "Grand Island - Museum",
    caption: "Stuhr Museum"
  },
  {
    id: 3,
    src: "/images/city3-StateFair.jpg",
    alt: "Grand Island - State Fair",
    caption: "Státní veletrh"
  },
  {
    id: 4,
    src: "/images/city4-waterpark.jpg", 
    alt: "Grand Island - Koupaliště",
    caption: "Island Oasis Water Park"
  }
];

export default function Galerie() {
  return (
    <Layout>
      <section className="relative w-full h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full flex">
          <div className="absolute w-full h-full bg-cover bg-center">
            <img
              src="/images/gallery-hero.jpg"
              className="object-cover w-full h-full"
              alt="Hero obrázek galerie"
            />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
        <div className="absolute px-16 max-w-xl text-left">
          <h1 className="text-4xl md:text-6xl font-bold">Galerie</h1>
          <p className="text-lg md:text-xl mt-4">
            Prohlédněte si fotografie z Grand Island Senior High School a města Grand Island.
          </p>
        </div>
      </section>

      {/* První carousel*/}
      <section className="max-w-7xl mx-auto pt-11 px-4 p-11 flex flex-col justify-center">
        <div className="text-center w-full mb-8">
          <h2 className="text-2xl md:text-4xl font-medium">Grand Island Senior High School</h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Podívejte se na fotografie naší školy
          </p>
        </div>
        
        <Carousel className="max-w-5xl mx-auto">
          <CarouselContent>
            {schoolImages.map((image) => (
              <CarouselItem key={image.id}>
                <div className="p-1">
                  <Card className="border-0 bg-transparent">
                    <CardContent className="flex flex-col items-center p-0">
                      <div className="relative w-full h-96 overflow-hidden rounded-lg">
                        <img 
                          src={image.src} 
                          alt={image.alt} 
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-4">
                          <p className="text-white text-lg">{image.caption}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-white/20 hover:bg-white/30 text-white" />
          <CarouselNext className="bg-white/20 hover:bg-white/30 text-white" />
        </Carousel>
      </section>
      
      {/* Druhý carousel */}
      <section className="max-w-7xl mx-auto pt-11 px-4 p-11 flex flex-col justify-center">
        <div className="text-center w-full mb-8">
          <h2 className="text-2xl md:text-4xl font-medium">Město Grand Island</h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Objevte krásy našeho města
          </p>
        </div>
        
        <Carousel className="max-w-5xl mx-auto">
          <CarouselContent>
            {cityImages.map((image) => (
              <CarouselItem key={image.id}>
                <div className="p-1">
                  <Card className="border-0 bg-transparent">
                    <CardContent className="flex flex-col items-center p-0">
                      <div className="relative w-full h-96 overflow-hidden rounded-lg">
                        <img 
                          src={image.src} 
                          alt={image.alt} 
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-4">
                          <p className="text-white text-lg">{image.caption}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-white/20 hover:bg-white/30 text-white" />
          <CarouselNext className="bg-white/20 hover:bg-white/30 text-white" />
        </Carousel>
      </section>
    </Layout>
  );
}