import * as React from "react";
import {
  Input,
  Card,
  Row,
  Col,
  Button,
  Descriptions,
  Select,
  Form,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Product } from "../../commoninterfaces/CommonInterfaces";
import ProductService from "../../service/ProductService";

const { Option } = Select;

interface ProductsCalculation {
  products: Product[];
  selectedProductId: number;
  quantity: number;
  productsSummary: ProductPriceSummary;
}

interface ProductPriceSummary {
  amount: number;
  cartons: number;
  unit: number;
}

export class productcal extends React.Component<any, ProductsCalculation> {
  constructor(props: any) {
    super(props);
    this.state = {
      products: [],
      selectedProductId: 0,
      quantity: 0,
      productsSummary: { amount: 0, cartons: 0, unit: 0 },
    };
  }

  render() {
    // @ts-ignore
    return (
      <div className={""}>
        <br />
        <Form name="basic" initialValues={{ remember: true }}>
          <Row justify="center">
            <Col span={18}>
              <Card title="Search Products">
                <Row gutter={[16, 16]} justify="center">
                  <Col span={12}>
                    <Form.Item
                      name="select"
                      label="Product"
                      hasFeedback
                      rules={[
                        { required: true, message: "Please select a product" },
                      ]}
                    >
                      <Select
                        placeholder="Please select a product"
                        onChange={(value) => this.onChangeProduct(value)}
                      >
                        {this.state.products.map((value) => (
                          <Option value={value.id} key={value.id}>
                            {value.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col span={6}>
                    <Form.Item
                      label="Quantity"
                      name="quantity"
                      rules={[{ required: true, message: "required!" }]}
                    >
                      <Input
                        placeholder="Quantity"
                        name={"quantity"}
                        onKeyUp={this.onKeyUpValue.bind(this)}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={6} push={2}>
                    <Button
                      htmlType={"submit"}
                      type="primary"
                      icon={<SearchOutlined />}
                      onClick={(value) => this.loadCalculater()}
                    >
                      Search
                    </Button>
                  </Col>
                </Row>
                <br />
                <br />
              </Card>
            </Col>
          </Row>
        </Form>
        <Row justify="center" gutter={[16, 16]}>
          <Col span={18}>
            {console.log(this.state.productsSummary.amount)}
            <Card>
              <Descriptions title="Product Calculation Summary">
                <Descriptions.Item label="Total Price(RS)">
                  {this.state.productsSummary.amount}
                </Descriptions.Item>
                <Descriptions.Item label="carton(s)">
                  {this.state.productsSummary.cartons}
                </Descriptions.Item>
                <Descriptions.Item label="Unit(s)">
                  {this.state.productsSummary.unit}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
        </Row>
      </div>
    );
    /*Header Section*/
  }

  loadProductList() {
    ProductService.getProductList().then((response) => {
      console.log(response);
      console.log(response.data.data);
      this.setState({ products: response.data.data });
    });
  }

  onChangeProduct(productId: any) {
    this.setState({ selectedProductId: productId });
  }

  onKeyUpValue(quantity: any) {
    this.setState({ quantity: quantity.target.value });
  }

  loadCalculater() {
    console.log("here", this.state.selectedProductId, this.state.quantity);
    ProductService.productCal(
      this.state.selectedProductId,
      this.state.quantity
    ).then((response) => {
      console.log(response.data.data);
      this.setState({ productsSummary: response.data.data });
      console.log("psum", this.state.productsSummary);
    });
  }

  componentDidMount() {
    this.loadProductList();
    // this.loadCalculater()
  }
}
