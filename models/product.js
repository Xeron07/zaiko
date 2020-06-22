/** @format */

const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  p_id: String,
  name: String,
  cat_id: { type: String, default: "" },
  amount: { type: Number, default: 0 },
  unit_price: { type: Number, default: 0.0 },
});

module.exports = mongoose.model("products", productSchema);

/**
 *   <FormGroup>
                            <label htmlFor='exampleSelect1'>
                              Product Select
                            </label>
                            <Input
                              type='select'
                              name='select'
                              id='exampleSelect1'
                              defaultValue='0'
                              onChange={this.handleProductChanges}>
                              <option value='0' disabled>
                                Select one
                              </option>
                              {this.productDataView()}
                            </Input>
                          </FormGroup>
                        
 */
