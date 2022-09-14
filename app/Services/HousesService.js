import { appState } from "../AppState.js";
import { House } from "../Models/House.js";
import { Pop } from "../Utils/Pop.js";
import { saveState } from "../Utils/Store.js";
import { SandboxServer } from "./AxiosService.js";

class HousesService {
  async editHouse(formData) {
    const house = appState.activeHouse
    //@ts-ignore
    const res = await SandboxServer.put(`/api/houses/${house.id}`, formData)
    const updatedHouse = new House(res.data)
    //@ts-ignore
    const index = appState.houses.findIndex(h => h.id == house.id)
    appState.houses.splice(index, 1, updatedHouse)
    appState.emit('houses')
  }

  setActiveHouse(id) {
    //@ts-ignore
    const house = appState.houses.find(h => h.id == id)
    if (!house) {
      throw new Error("That is a bad Id")
    }
    //@ts-ignore
    appState.activeHouse = house
  }

  async deleteHouse(id) {
    const yes = await Pop.confirm('Delete the House?')
    if (!yes) {
      return
    }
    await SandboxServer.delete(`/api/houses/${id}`)
    //@ts-ignore
    appState.houses = appState.houses.filter(h => h.id != id)
  }

  async getHouses() {
    const res = await SandboxServer.get('/api/houses')
    appState.houses = res.data.map(house => new House(house))
  }

  async addHouse(formData) {
    const res = await SandboxServer.post('/api/houses', formData)
    console.log("added?: ", res.data)
    let house = new House(res.data)
    appState.houses = [... appState.houses, house]
  }

}

export const housesService = new HousesService()