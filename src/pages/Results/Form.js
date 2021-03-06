import React from 'react'
import styled from 'styled-components'
import { Form, Input, Button } from 'antd'

import { formatDateAndHour } from 'app/utils/format'

const Container = styled.div`
  max-width: 600px;
  margin: 25px;
`

const Versus = styled.div`
  margin-right: 16px;
  display: inline-block;
  font-size: 24px;
`

class MatchForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    const { form, match } = this.props
    form.validateFields((err, fieldsValue) => {
      if (err) return
      const values = { ...fieldsValue }
      values.matchId = match.id

      this.props.createResult(values)
    })
  }

  getRequiredFieldDecorator = (fieldName, message, initialValue) =>
    this.props.form.getFieldDecorator(fieldName, {
      initialValue,
      rules: [{ required: true, message }]
    })

  render() {
    const { match, result } = this.props

    return (
      <Container>
        <h4>{formatDateAndHour(match.date)}</h4>
        <Form onSubmit={this.handleSubmit} layout="inline">
          <Form.Item label={match.team1.initials}>
            {this.getRequiredFieldDecorator(
              'team1Score',
              'Por favor informe o placar do time 1',
              result && result.team1Score
            )(<Input placeholder="Placar" type="integer" style={{ width: '80px' }} />)}
          </Form.Item>
          <Versus>X</Versus>
          <Form.Item label={match.team2.initials}>
            {this.getRequiredFieldDecorator(
              'team2Score',
              'Por favor informe o placar do time 2',
              result && result.team2Score
            )(<Input placeholder="Placar" type="integer" style={{ width: '80px' }} />)}
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
