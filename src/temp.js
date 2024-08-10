import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardImg,
  Col,
  Row,
  Image,
} from 'flowbite-react';

const FinalistCities = () => {
  const cities = [
    {
      name: 'Madrid',
      description: 'The architecture of Madrid is a dialogue between history and modernity, where each building tell...',
      flag: '🇪🇸',
      country: 'Spain',
      votes: 54,
      images: [
        {
          src: '/images/madrid-1.jpg',
          alt: 'Madrid Image 1',
          play: true,
        },
        {
          src: '/images/madrid-2.jpg',
          alt: 'Madrid Image 2',
          play: true,
        },
        {
          src: '/images/madrid-3.jpg',
          alt: 'Madrid Image 3',
          play: true,
        },
      ],
    },
    {
      name: 'Oslo',
      description:
        'Oslo, where modernity embraces nature, and each structure reflects the harmony of...',
      flag: '🇳🇴',
      country: 'Norway',
      votes: 26,
      images: [
        {
          src: '/images/oslo-1.jpg',
          alt: 'Oslo Image 1',
          play: true,
        },
      ],
    },
    {
      name: 'Paris',
      description:
        'The city where architecture is petrified poetry, and each stone hides incredible stories of love...',
      flag: '🇫🇷',
      country: 'France',
      votes: 22,
      images: [
        {
          src: '/images/paris-1.jpg',
          alt: 'Paris Image 1',
          play: true,
        },
        {
          src: '/images/paris-2.jpg',
          alt: 'Paris Image 2',
          play: true,
        },
      ],
    },
  ];

  return (
    <div className="bg-gray-100 py-8">
      <div className="container mx-auto mt-8">
        <Image
          className="rounded-lg shadow-lg"
          src="/images/sponsor-placeholder.jpg"
          alt="Sponsor"
        />
      </div>
        
        <p className="text-lg text-center text-gray-600 mb-8">
          Step into a world of urban wonders and cast your vote for the most
          captivating city!
        </p>
        <Row className="justify-center gap-6">
          {cities.map((city) => (
            <Col key={city.name} md="3">
              <Card>
                <CardBody className="relative">
                  {city.images.map((image, index) => (
                    <CardImg
                      key={index}
                      className={
                        index === 0
                          ? 'rounded-t-lg'
                          : index === city.images.length - 1
                          ? 'rounded-b-lg'
                          : 'rounded-none'
                      }
                      src={image.src}
                      alt={image.alt}
                    />
                  ))}
                  {city.images.length > 1 && (
                    <div className="absolute bottom-4 right-4">
                      <Button
                        className="bg-gray-800 hover:bg-gray-700"
                        size="sm"
                      >
                        <svg
                          className="w-4 h-4 text-gray-200"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                      </Button>
                    </div>
                  )}
                </CardBody>
                <CardFooter className="flex flex-col items-center justify-between py-4">
                  <h5 className="text-xl font-bold text-gray-900">
                    {city.name}
                  </h5>
                  <p className="text-gray-500 text-sm">{city.description}</p>
                  <div className="flex items-center mt-2">
                    <span className="mr-2">{city.flag}</span>
                    <span className="text-gray-700">{city.country}</span>
                  </div>
                  <div className="flex items-center mt-2">
                    <span className="mr-2 text-gray-700">{city.votes}</span>
                    <span className="text-gray-700">votes</span>
                  </div>
                  <Button
                    className="bg-gray-800 hover:bg-gray-700 mt-4"
                    size="sm"
                  >
                    VOTE
                  </Button>
                </CardFooter>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
  );
};

export default FinalistCities;