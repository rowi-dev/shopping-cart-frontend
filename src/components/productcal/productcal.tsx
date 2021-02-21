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
  notification,
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
              <Card title="Price Calculator">
                <Row gutter={[16, 16]} justify="center">
                  <Col span={8}>
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

                  <Col span={8}>
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

                  <Col span={8} push={2}>
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
              <Descriptions title="Price Calculation Summary">

                <div className="site-card-border-less-wrapper">
                  <Card title="Total Price(RS)" bordered={false} style={{ width: 300 }}>
                    <h2>{this.financial(this.state.productsSummary.amount)}</h2>
                  </Card>
                </div>
                <div className="site-card-border-less-wrapper">
                  <Card title="Carton(s)" bordered={false} style={{ width: 300 }}>
                  <h2>{this.financial(this.state.productsSummary.cartons)}</h2>
                  </Card>
                </div>
                <div className="site-card-border-less-wrapper">
                  <Card title="Unit(s)" bordered={false} style={{ width: 300 }}>
                  <h2>{this.financial(this.state.productsSummary.unit)}</h2>
                  </Card>
                </div>
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
    if(this.state.selectedProductId && this.state.quantity) {
    ProductService.productCal(
      this.state.selectedProductId,
      this.state.quantity
    ).then((response) => {
      console.log(response.data.data);
      this.setState({ productsSummary: response.data.data });
      console.log("psum", this.state.productsSummary);
      this.openNotificationSuccess();
    }).catch(err => {
      console.log(err);
      this.openNotificationError(err.response);
    });
  } else {
    
  }
}

  openNotificationError(err: String) {
    notification.error({
      message: 'Error',
      description:
        "Error occurred"
    });
  }


  openNotificationSuccess() {
    notification.success({
      message: 'Success',
      description:
        "Calculation successful"
    });
  }


  financial = (x: any) => Number.parseFloat(x).toFixed(2);

  componentDidMount() {
    this.loadProductList();
    // this.loadCalculater()
  }
}
