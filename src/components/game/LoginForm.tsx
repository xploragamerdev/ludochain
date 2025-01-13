import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface LoginFormProps {
  username: string;
  onUsernameChange: (value: string) => void;
  onLogin: () => void;
}

export const LoginForm = ({ username, onUsernameChange, onLogin }: LoginFormProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <h1 className="text-4xl font-bold mb-8 text-indigo-900">LudoChain</h1>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Bienvenido</h2>
        <div className="space-y-4">
          <Input
            placeholder="Nombre de usuario"
            value={username}
            onChange={(e) => onUsernameChange(e.target.value)}
            className="w-full"
          />
          <Button 
            onClick={onLogin} 
            className="w-full bg-indigo-600 hover:bg-indigo-700"
            disabled={!username.trim()}
          >
            Jugar
          </Button>
          <div className="text-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="link" className="text-indigo-600">
                  ¿Cómo jugar?
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Reglas del Juego</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 text-sm">
                  <p>- Cada jugador tiene 4 fichas</p>
                  <p>- Necesitas sacar un 6 para sacar una ficha de casa</p>
                  <p>- Mueve tus fichas por turnos según el número del dado</p>
                  <p>- Las casillas amarillas son seguras</p>
                  <p>- Captura fichas de otros jugadores cayendo en su casilla</p>
                  <p>- Gana quien lleve todas sus fichas al centro primero</p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};