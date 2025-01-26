import SandBox from "./components/sandbox";
import { TabsHandler } from "./components/web/tabs";

const sandBox = new SandBox('sandbox');
sandBox.start();

const tabs = new TabsHandler('#tabs', 'tab-btn__solid');