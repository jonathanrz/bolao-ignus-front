import React from 'react'
import styled from 'styled-components'
import { Form, DatePicker, TimePicker, Input, Button } from 'antd'

const Container = styled.div`
  max-width: 600px;
  margin: 50px;
`

class MatchForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    const { form } = this.props
    form.validateFields((err, fieldsValue) => {
      if (err) return
      const values = { ...fieldsValue }
      const { date, time } = values
      date.hour(time.hour())
      date.minute(time.minute())
      values.date = parseInt(date.format('X'))
      values.time = undefined

      this.props.createMatch(values)
      form.setFieldsValue({
        date: null,
        time: null,
        team1Initials: '',
        team2Initials: ''
      })
    })
  }

  getRequiredFieldDecorator = (fieldName, message) =>
    this.props.form.getFieldDecorator(fieldName, { rules: [{ required: true, message }] })

  render() {
    return (
      <Container>
        <h4>Novo jogo</h4>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {this.getRequiredFieldDecorator('date')(
              <DatePicker format="DD/MM/YYYY" placeholder="Data" />
            )}
          </Form.Item>
          <Form.Item>
            {this.getRequiredFieldDecorator('time')(
              <TimePicker format="HH:mm" placeholder="Hora" />
            )}
          </Form.Item>
          <Form.Item>
            {this.getRequiredFieldDecorator(
              'team1Initials',
              'Por favor informe as iniciais do time 1'
            )(<Input placeholder="Iniciais Time 1" />)}
          </Form.Item>
          <Form.Item>
            {this.getRequiredFieldDecorator(
              'team2Initials',
              'Por favor informe as iniciais do time 2'
            )(<Input placeholder="Iniciais Time 2" />)}
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

export default Form.create()(MatchForm)
