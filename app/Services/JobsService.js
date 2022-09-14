import { appState } from "../AppState.js";
import { Job } from "../Models/Job.js";
import { Pop } from "../Utils/Pop.js";
import { SandboxServer } from "./AxiosService.js";

class JobsService {
  async editJob(formData) {
    const job = appState.activeJob
    // @ts-ignore
    const res = await SandboxServer.put(`/api/jobs${job.id}`, formData)
    console.log("the update response", res.data)
    const updatedJob = new Job(res.data)
    // @ts-ignore
    const index = appState.jobs.findIndex(j => j.id == job.id)
    appState.jobs.splice(index, 1, updatedJob)
  }
  setActiveJob(id) {
    // @ts-ignore
    const job = appState.jobs.find(j => j.id == id)
    if (!job) {
      throw new Error("That is a bad Id")
    }
    // @ts-ignore
    appState.activeJob = job
    console.log("the active job", appState.activeJob)
  }
  async deleteJob(id) {
    const yes = await Pop.confirm("Delete the Job?")
    if (!yes) {
      return
    }
    await SandboxServer.delete(`/api/jobs/${id}`)
    // @ts-ignore
    appState.jobs = appState.jobs.filter(j => j.id != id)
  }

  async getJobs() {
    const res = await SandboxServer.get('/api/jobs')
    console.log("results: ", res.data.map(job => new Job(job)))
    appState.jobs = res.data.map(job => new Job(job))
  }

  async addJob(formData) {
    const res = await SandboxServer.post('/api/jobs', formData)
    console.log("Create Job's Response: ", res.data)
    let job = new Job(formData)
    appState.jobs = [...appState.jobs, job]
  }
}

export const jobsService = new JobsService()