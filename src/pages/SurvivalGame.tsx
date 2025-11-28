import { useState, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Text } from "@react-three/drei";
import * as THREE from "three";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { sounds } from "@/utils/sounds";

interface PlayerProps {
  position: THREE.Vector3;
  onCollectResource: () => void;
  onHit: () => void;
  gameOver: boolean;
}

const Player = ({ position, onCollectResource, onHit, gameOver }: PlayerProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current && !gameOver) {
      meshRef.current.rotation.y += 0.02;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={0.5} />
    </mesh>
  );
};

interface ObstacleProps {
  position: [number, number, number];
  speed: number;
  playerPos: THREE.Vector3;
  onHit: () => void;
  gameOver: boolean;
}

const Obstacle = ({ position: initialPos, speed, playerPos, onHit, gameOver }: ObstacleProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hit, setHit] = useState(false);

  useFrame(() => {
    if (meshRef.current && !gameOver && !hit) {
      meshRef.current.position.z += speed;
      meshRef.current.rotation.x += 0.03;
      meshRef.current.rotation.y += 0.02;

      if (meshRef.current.position.z > 10) {
        meshRef.current.position.z = -50;
        meshRef.current.position.x = (Math.random() - 0.5) * 15;
        meshRef.current.position.y = (Math.random() - 0.5) * 8;
      }

      const distance = meshRef.current.position.distanceTo(playerPos);
      if (distance < 1.2 && !hit) {
        setHit(true);
        onHit();
      }
    }
  });

  return (
    <mesh ref={meshRef} position={initialPos}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0.3} />
    </mesh>
  );
};

interface ResourceProps {
  position: [number, number, number];
  speed: number;
  playerPos: THREE.Vector3;
  onCollect: () => void;
  gameOver: boolean;
}

const Resource = ({ position: initialPos, speed, playerPos, onCollect, gameOver }: ResourceProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [collected, setCollected] = useState(false);

  useFrame(() => {
    if (meshRef.current && !gameOver && !collected) {
      meshRef.current.position.z += speed;
      meshRef.current.rotation.y += 0.05;

      if (meshRef.current.position.z > 10) {
        meshRef.current.position.z = -50;
        meshRef.current.position.x = (Math.random() - 0.5) * 15;
        meshRef.current.position.y = (Math.random() - 0.5) * 8;
        setCollected(false);
      }

      const distance = meshRef.current.position.distanceTo(playerPos);
      if (distance < 1 && !collected) {
        setCollected(true);
        onCollect();
        if (meshRef.current) {
          meshRef.current.position.z = -50;
        }
      }
    }
  });

  if (collected) return null;

  return (
    <mesh ref={meshRef} position={initialPos}>
      <octahedronGeometry args={[0.4, 0]} />
      <meshStandardMaterial color="#ffff00" emissive="#ffff00" emissiveIntensity={0.5} />
    </mesh>
  );
};

const Scene = ({ 
  playerPos, 
  onCollectResource, 
  onHit, 
  gameOver, 
  difficulty 
}: { 
  playerPos: THREE.Vector3; 
  onCollectResource: () => void; 
  onHit: () => void; 
  gameOver: boolean;
  difficulty: number;
}) => {
  const baseSpeed = 0.05 + difficulty * 0.02;
  
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0088ff" />
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      <Player position={playerPos} onCollectResource={onCollectResource} onHit={onHit} gameOver={gameOver} />

      {Array.from({ length: 8 }).map((_, i) => (
        <Obstacle
          key={`obstacle-${i}`}
          position={[(Math.random() - 0.5) * 15, (Math.random() - 0.5) * 8, -10 - i * 8]}
          speed={baseSpeed}
          playerPos={playerPos}
          onHit={onHit}
          gameOver={gameOver}
        />
      ))}

      {Array.from({ length: 6 }).map((_, i) => (
        <Resource
          key={`resource-${i}`}
          position={[(Math.random() - 0.5) * 15, (Math.random() - 0.5) * 8, -15 - i * 10]}
          speed={baseSpeed * 0.8}
          playerPos={playerPos}
          onCollect={onCollectResource}
          gameOver={gameOver}
        />
      ))}

      <Text
        position={[0, 5, -10]}
        fontSize={0.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        Космический выживальщик
      </Text>
    </>
  );
};

const SurvivalGame = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [health, setHealth] = useState(100);
  const [score, setScore] = useState(0);
  const [resources, setResources] = useState(0);
  const [time, setTime] = useState(0);
  const [difficulty, setDifficulty] = useState(1);
  
  const playerPos = useRef(new THREE.Vector3(0, 0, 0));
  const keysPressed = useRef<{ [key: string]: boolean }>({});

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const moveInterval = setInterval(() => {
      const speed = 0.2;
      const bounds = 7;

      if (keysPressed.current['w'] || keysPressed.current['arrowup']) {
        playerPos.current.y = Math.min(playerPos.current.y + speed, bounds);
      }
      if (keysPressed.current['s'] || keysPressed.current['arrowdown']) {
        playerPos.current.y = Math.max(playerPos.current.y - speed, -bounds);
      }
      if (keysPressed.current['a'] || keysPressed.current['arrowleft']) {
        playerPos.current.x = Math.max(playerPos.current.x - speed, -bounds);
      }
      if (keysPressed.current['d'] || keysPressed.current['arrowright']) {
        playerPos.current.x = Math.min(playerPos.current.x + speed, bounds);
      }
    }, 16);

    return () => clearInterval(moveInterval);
  }, [isPlaying, gameOver]);

  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const timer = setInterval(() => {
      setTime(prev => prev + 1);
      setScore(prev => prev + 10);
      
      if (time > 0 && time % 30 === 0) {
        setDifficulty(prev => prev + 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, gameOver, time]);

  const handleCollectResource = () => {
    sounds.coin();
    setResources(prev => prev + 1);
    setScore(prev => prev + 50);
    setHealth(prev => Math.min(prev + 5, 100));
  };

  const handleHit = () => {
    sounds.error();
    setHealth(prev => {
      const newHealth = prev - 20;
      if (newHealth <= 0) {
        setGameOver(true);
        setIsPlaying(false);
      }
      return Math.max(newHealth, 0);
    });
  };

  const startGame = () => {
    sounds.success();
    setIsPlaying(true);
    setGameOver(false);
    setHealth(100);
    setScore(0);
    setResources(0);
    setTime(0);
    setDifficulty(1);
    playerPos.current.set(0, 0, 0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-screen w-full bg-black relative">
      {isPlaying && (
        <>
          <div className="absolute top-4 left-4 z-20 space-y-2">
            <Card className="p-4 bg-black/70 backdrop-blur border-green-500/30">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Heart" className="text-red-500" size={20} />
                <div className="flex-1">
                  <div className="h-4 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-red-600 to-red-400 transition-all"
                      style={{ width: `${health}%` }}
                    />
                  </div>
                </div>
                <span className="text-white font-bold text-sm">{health}%</span>
              </div>
            </Card>

            <Card className="p-3 bg-black/70 backdrop-blur border-yellow-500/30">
              <div className="flex items-center gap-2">
                <Icon name="Star" className="text-yellow-400" size={16} />
                <span className="text-white font-bold">{score}</span>
              </div>
            </Card>

            <Card className="p-3 bg-black/70 backdrop-blur border-blue-500/30">
              <div className="flex items-center gap-2">
                <Icon name="Gem" className="text-blue-400" size={16} />
                <span className="text-white font-bold">{resources}</span>
              </div>
            </Card>

            <Card className="p-3 bg-black/70 backdrop-blur border-purple-500/30">
              <div className="flex items-center gap-2">
                <Icon name="Clock" className="text-purple-400" size={16} />
                <span className="text-white font-bold">{formatTime(time)}</span>
              </div>
            </Card>

            <Card className="p-3 bg-black/70 backdrop-blur border-orange-500/30">
              <div className="flex items-center gap-2">
                <Icon name="Zap" className="text-orange-400" size={16} />
                <span className="text-white font-bold">Ур. {difficulty}</span>
              </div>
            </Card>
          </div>

          <div className="absolute top-4 right-4 z-20">
            <Card className="p-4 bg-black/70 backdrop-blur border-white/20">
              <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                <Icon name="Gamepad2" size={16} />
                Управление
              </h3>
              <div className="text-xs text-white/70 space-y-1">
                <p>WASD / Стрелки - движение</p>
                <p>🟢 Зелёный шар - ты</p>
                <p>🔴 Красные кубы - препятствия</p>
                <p>🟡 Жёлтые кристаллы - ресурсы</p>
              </div>
            </Card>
          </div>
        </>
      )}

      {!isPlaying && !gameOver && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/80 backdrop-blur">
          <Card className="p-8 bg-black/70 backdrop-blur border-green-500/30 max-w-md">
            <div className="text-center">
              <Icon name="Rocket" size={64} className="mx-auto mb-4 text-green-400" />
              <h1 className="text-4xl font-bold text-white mb-4">Космический выживальщик</h1>
              <p className="text-white/70 mb-6">
                Уворачивайся от препятствий, собирай ресурсы и выживай как можно дольше в бескрайнем космосе!
              </p>
              <Button onClick={startGame} size="lg" className="gap-2">
                <Icon name="Play" size={20} />
                Начать игру
              </Button>
            </div>
          </Card>
        </div>
      )}

      {gameOver && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/80 backdrop-blur">
          <Card className="p-8 bg-black/70 backdrop-blur border-red-500/30 max-w-md">
            <div className="text-center">
              <Icon name="Skull" size={64} className="mx-auto mb-4 text-red-400" />
              <h2 className="text-4xl font-bold text-white mb-4">Игра окончена!</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between bg-white/5 p-3 rounded">
                  <span className="text-white/70">Счёт:</span>
                  <span className="text-white font-bold text-xl">{score}</span>
                </div>
                <div className="flex items-center justify-between bg-white/5 p-3 rounded">
                  <span className="text-white/70">Ресурсов собрано:</span>
                  <span className="text-white font-bold text-xl">{resources}</span>
                </div>
                <div className="flex items-center justify-between bg-white/5 p-3 rounded">
                  <span className="text-white/70">Время выживания:</span>
                  <span className="text-white font-bold text-xl">{formatTime(time)}</span>
                </div>
                <div className="flex items-center justify-between bg-white/5 p-3 rounded">
                  <span className="text-white/70">Достигнутый уровень:</span>
                  <span className="text-white font-bold text-xl">{difficulty}</span>
                </div>
              </div>

              <Button onClick={startGame} size="lg" className="gap-2">
                <Icon name="RotateCcw" size={20} />
                Играть снова
              </Button>
            </div>
          </Card>
        </div>
      )}

      <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
        <Scene
          playerPos={playerPos.current}
          onCollectResource={handleCollectResource}
          onHit={handleHit}
          gameOver={gameOver}
          difficulty={difficulty}
        />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
};

export default SurvivalGame;
