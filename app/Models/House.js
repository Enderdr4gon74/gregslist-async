export class House {

  /**
   * @param {{bedrooms: number, bathrooms: number, levels: number, imgUrl: string, year: number, price: number, description?: string, id?: string}} data 
   */
  constructor(data) {
    this.id = data.id
    this.bedrooms = data.bedrooms
    this.bathrooms = data.bathrooms
    this.levels = data.levels
    this.imgUrl = data.imgUrl
    this.year = data.year
    this.price = data.price
    this.description = data.description
  }

  get houseCardTemplate() {
    return /* html */ `
    <div class="col-md-4 col-lg-3 mb-3">
      <div class="card rounded">
        <img src="${this.imgUrl}" alt="house" class="img-fluid rounded-top">
        <div class="card-body">
          <h4>${this.bedrooms} Bedroom, ${this.bathrooms} Bath, ${this.levels} Story</h4>
          <div class="d-flex justify-content-between">
            <h6 class="text-info">Year: ${this.year}</h6>
            <h6 class="text-success">Cost: $${this.price}</h6>
          </div>
          <p>${this.description}</p>
        </div>
        <div class="card-footer d-flex align-items-center justify-content-around">
          <button class="btn text-uppercase" onclick="app.housesController.deleteHouse('${this.id}')">Delete</button>
          <button class="btn text-uppercase text-success" data-bs-toggle="offcanvas" data-bs-target="#orange" onclick="app.housesController.beginEdit('${this.id}')">Edit</button>
        </div>
      </div>
    </div>
    `
  }

  /**@param {House} [editable] */
  static getHouseForm(editable) {
    editable = editable || new House({bedrooms: 1, bathrooms: 1, levels: 1, year: 2000, price: 100000, imgUrl: '', description: ''})
    return /*html*/`
    <form onsubmit="app.housesController.handleSubmit()">

        <div class="form-floating mb-3">
          <input type="number" class="form-control" name="bedrooms" required min="1" value="${editable.bedrooms}">
          <label for="bedrooms">Bedrooms</label>
        </div>

        <div class="form-floating mb-3">
          <input type="number" step="0.5" class="form-control" name="bathrooms" required min="1" value="${editable.bathrooms}">
          <label for="bathrooms">Bathrooms</label>
        </div>

        <div class="form-floating mb-3">
          <input type="number" class="form-control" name="levels" required min="1" value="${editable.levels}">
          <label for="levels">Levels</label>
        </div>

        <div class="form-floating mb-3">
          <input type="text" class="form-control" name="imgUrl" value="${editable.imgUrl}">
          <label for="imgUrl">Image Url <i>(We are too lazy for uploads)</i></label>
        </div>

        <div class="form-floating mb-3">
          <input type="number" class="form-control" name="year" required min="0" max="9999" value="${editable.year}">
          <label for="year">Year</label>
        </div>

        <div class="form-floating mb-3">
          <input type="number" step="0.01" class="form-control" name="price" required min="0" value="${editable.price}">
          <label for="price">Price</label>
        </div>

        <div class="form-floating mb-3">
          <textarea class="form-control" placeholder="Describe your Listing" name="description" value="${editable.description}"></textarea>
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