import MusicExperience from "./components/MusicExperience";
import { musicStyles } from "./data/music-styles";

export default function Home() {
  return <MusicExperience styles={musicStyles} />;
}
