export class Job {

  /**
   * @param {{company: string, jobTitle: string, hours: number, rate: number, description?: string, id?: string}} data 
   */
  constructor(data) {
    this.company = data.company
    this.jobTitle = data.jobTitle
    this.hours = data.hours
    this.rate = data.rate
    this.description = data.description || ""
    this.id = data.id
  }

  get jobCardTemplate() {
    return /* html */ `
    <div class="col-md-4 col-lg-3 mb-3">
      <div class="card rounded">
        <div class="card-body">
          <h4 class="text-primary">${this.company}</h4>
          <h6 class="text-warning">${this.jobTitle}</h6>
          <h6 class="text-success"><strong>$${this.rate}</strong></h6>
          <h6 class="text-dark">${this.hours} hours a week</h6>
          <p class="text-dark">${this.description}</p>
        </div>
        <div class="card-footer d-flex align-items-center justify-content-around">
          <button class="btn text-uppercase" onclick="app.jobsController.deleteJob('${this.id}')">Delete</button>
          <button class="btn text-uppercase text-success" data-bs-toggle="offcanvas" data-bs-target="#apple" onclick="app.jobsController.beginEdit('${this.id}')">Edit</button>
        </div>
      </div>
    </div>
    `
  }

  /**@param {Job} [editable] */
  static getJobForm(editable) {
    editable = editable || new Job({company: '', jobTitle: '', hours: 40, rate: 1000, description: ''})
    return /*html*/`
    <form onsubmit="app.jobsController.handleSubmit()">
  
      <div class="form-floating mb-3">
        <input type="text" class="form-control" name="company" required maxlength="50" value="${editable.company}">
        <label for="company">Company</label>
      </div>
  
      <div class="form-floating mb-3">
        <input type="text" class="form-control" name="jobTitle" required maxlength="100" value="${editable.jobTitle}">
        <label for="jobTitle">Job Title</label>
      </div>
  
      <div class="form-floating mb-3">
        <input type="number" step="0.01" class="form-control" name="hours" required min="0.0" max="80.0" value="${editable.hours}">
        <label for="hours">Hours</label>
      </div>
  
      <div class="form-floating mb-3">
        <input type="number" step="0.01" class="form-control" name="rate" required min="0" value="${editable.rate}">
        <label for="rate">Rate</label>
      </div>
  
      <div class="form-floating">
        <textarea class="form-control" placeholder="Describe your Listing" name="description">${editable.description}</textarea>
        <label for="description">Description</label>
      </div>
  
      <div class="d-flex my-4 justify-content-between align-items-center">
        <button class="btn" type="reset">Cancel</button>
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
  
    </form>
    `
  }
}