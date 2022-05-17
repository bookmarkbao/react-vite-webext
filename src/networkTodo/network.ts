import { VConsoleNetworkModel } from './network.model';
import { VConsoleNetworkExporter } from './network.exporter';

const MAX_NETWORK_NUMBER = 1000;

export class VConsoleNetworkPlugin {
  public model: VConsoleNetworkModel = VConsoleNetworkModel.getSingleton(VConsoleNetworkModel, 'VConsoleNetworkModel');
  public exporter: VConsoleNetworkExporter;
  constructor(id: string, name: string, renderProps = { }) {
    this.exporter = new VConsoleNetworkExporter(id);
  }

  public trigger(){
    console.log(`====trigger test`)
    return this;
  }

  public onReady() {
    this.onUpdateOption();
  }

  public onAddTool(callback) {
    const toolList = [{
      name: 'Clear',
      global: false,
      onClick: (e) => {
        this.model.clearLog();
      }
    }];
    callback(toolList);
  }

  public onRemove() {
    if (this.model) {
      this.model.unMock();
    }
  }

  public onUpdateOption() {
    // if (this.vConsole.option.network?.maxNetworkNumber !== this.model.maxNetworkNumber) {
    //   this.model.maxNetworkNumber = Number(this.vConsole.option.network?.maxNetworkNumber) || MAX_NETWORK_NUMBER;
    // }
  }
}
