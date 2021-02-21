import React from "react";
import "antd/dist/antd.css";
import "./style.css";
import { Table, Row, Col, Card, Form, Select, notification } from "antd";
import ProductService from "../../service/ProductService";
import { Product } from "../../commoninterfaces/CommonInterfaces";

const { Option } = Select;
const columns = [
  {
    title: "Quantity",
    dataIndex: "qty",
    key: "qty",  
  },
  {
    title: "Price(RS)",
    dataIndex: "amount",
    key: "amount",
  },
];

interface ProductListState {
  products: Product[];
  productsGrid: ProductsGrid[];
}

interface ProductsGrid {
  qty: number;
  amount: number;
}

export class productlist extends React.Component<any, ProductListState> {
  constructor(props: any) {
    super(props);
    this.state = {
      products: [],
      productsGrid: [],
    };
  }

  render() {
    return (
      <div>
        <br />
        <Row justify="center">
          <Col span={12}>
            <Card title="Products price list">
              <p>Product</p>
              {/*search input*/}
              <Form name="basic" initialValues={{ remember: true }}>
                <Form.Item
                  label=""
                  name="search"
                  rules={[{ required: true, message: "required!" }]}
                >
                  <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Select a product"
                    optionFilterProp="children"
                    onChange={(value) => this.onChangeProduct(value)}
                  >
                    {this.state.products.map((value) => (
                      <Option value={value.id} key={value.id}>
                        {value.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Form>
              <br />
              <br /> <br />
              {/*//table*/}
              <div>
                <Table
                  bordered
                  className={"table-border"}
                  rowKey="unitCount"
                  columns={columns}
                  dataSource={this.state.productsGrid}
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }

  loadProductList() {
    ProductService.getProductList().then((response) => {
      console.log(response);
      console.log(response.data.data);
      this.setState({ products: response.data.data });
      console.log(this.state.products);
    }).catch(err => {
      console.log(err);
      this.openNotificationWithIcon(err.response);
  });
  }

  onChangeProduct(productId: any) {
    ProductService.getProductGrid(productId).then((response) => {
      console.log(response);
      console.log(response.data.data);
      this.setState({ productsGrid: response.data.data });
    }).catch(err => {
      console.log(err);
      this.openNotificationWithIcon(err.response);
  });
  }
 
openNotificationWithIcon(err: String){
  notification.error({
    message: 'Error',
    description:
      "Error occurred"
  });
}

  componentDidMount() {
    this.loadProductList();
  }
}
