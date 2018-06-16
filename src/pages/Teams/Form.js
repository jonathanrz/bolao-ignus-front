import React from 'react'
import styled from 'styled-components'
import { Form, Input, Button } from 'antd'

const Container = styled.div`
  max-width: 600px;
  margin: 50px;
`

class TeamForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) return
      this.props.createTeam(fieldsValue)
    })
  }

  getRequiredFieldDecorator = (fieldName, message) =>
    this.props.form.getFieldDecorator(fieldName, { rules: [{ required: true, message }] })

  render() {
    return (
      <Container>
        <h4>Novo time</h4>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {this.getRequiredFieldDecorator('name', 'Por favor informe o nome do time')(
              <Input placeholder="Nome" />
            )}
          </Form.Item>
          <Form.Item>
            {this.getRequiredFieldDecorator('initials', 'Por favor informe as iniciais do time')(
              <Input placeholder="Iniciais" />
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Salvar
            </Button>
          </Form.Item>
        </Form>
      </Container>
    )
  }
}

export default Form.create()(TeamForm)
