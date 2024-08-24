import { ModeToggle } from "./components/theme/mode-toggle";
import { Button } from "./components/ui/button";

function App() {
  return (
    <>
      <h1 className="text-3xl">Hello World</h1>
      <Button>Click Me</Button>
      <ModeToggle />
    </>
  );
}

export default App;
