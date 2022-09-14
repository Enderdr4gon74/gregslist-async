import { setHTML } from "../Utils/Writer.js"
import { appState } from "../AppState.js"
import { getFormData } from "../Utils/FormHandler.js"
import { jobsService } from "../Services/JobsService.js"
import { Job } from "../Models/Job.js"
import { Pop } from "../Utils/Pop.js"

function drawJobs() {
  let template = ''
  appState.jobs.forEach(Job => template += Job.jobCardTemplate)
  setHTML('listings', template)
}

export class JobsController {
  constructor() {
    appState.on('jobs', drawJobs)
  }

  async getJobs() {
    try {
      await jobsService.getJobs()
    } catch (error) {
      console.error('[GetJobs]', error)
      Pop.error(error)
    }
  }

  showJobs() {
    this.getJobs()
    setHTML('formsJobs', Job.getJobForm())
  }

  async handleSubmit() {
    try {
      // @ts-ignore
      window.event.preventDefault()
      // @ts-ignore
      const form = window.event.target
      let formData = getFormData(form)
      if (appState.activeJob) {
        await jobsService.editJob(formData)
      } else {
        await jobsService.addJob(formData)
      }
      // @ts-ignore
      form.reset()
    } catch (error) {
      console.error('[addJob]', error)
      Pop.error(error)
    }

  }

  async deleteJob(id) {
    try {
      await jobsService.deleteJob(id)
    } catch (error) {
      console.error('[DeletingJob]', error)
      Pop.error(error)
    }
  }

  addJob() {
    // @ts-ignore
    appState.activeJob = null
    const template = Job.getJobForm()
    setHTML('formsJobs', template)
  }

  beginEdit(id) {
    jobsService.setActiveJob(id)
    const editable = appState.activeJob
    // @ts-ignore
    const template = Job.getJobForm(editable)

    setHTML("formsJobs", template)
  }
}