import PropTypes from 'prop-types';
import React from 'react';
import '../styles/Checkout.css';

class Checkout extends React.Component {
  constructor() {
    super();
    this.state = {
      productCart: JSON.parse(localStorage.getItem('listCart')),
      name: '',
      email: '',
      cpf: '',
      phone: '',
      cep: '',
      address: '',
      paymentMethod: '',
      mensagem: false,
    };
  }

  formValidation = () => {
    const { name, email, cpf,
      phone, cep, address, paymentMethod } = this.state;
    const informations = [name, email, cpf,
      phone, cep, address, paymentMethod];
    const validation = informations.every((element) => element.length > 0);
    return validation;
  };

  handleClick = () => {
    const { history } = this.props;
    const valid = this.formValidation();
    if (valid) {
      localStorage.clear();
      history.push('/');
    } else {
      this.setState({ mensagem: true });
    }
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'radio' ? target.id : target.value;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { mensagem, productCart } = this.state;
    return (
      <div>
        {productCart.length > 0 ? (productCart.map((product) => (
          <h4
            data-testid="shopping-cart-product-name"
            key={ product.id }
          >
            {product.title}
          </h4>))) : <h1>Seu carrinho está vazio</h1> }
        <form>
          <div>
            <label htmlFor="fullName" className="nomeCompleto">
              Nome Completo
              <input
                className="nome"
                data-testid="checkout-fullname"
                type="text"
                id="fullName"
                onChange={ this.handleChange }
                name="name"
              />
            </label>
          </div>
          <div>
            <label htmlFor="email" className="emailCompleto">
              E-mail
              <input
                className="email"
                data-testid="checkout-email"
                type="email"
                id="email"
                onChange={ this.handleChange }
                name="email"
              />
            </label>
          </div>
          <div>
            <label htmlFor="cpf" className="cpfCompleto">
              CPF
              <input
                className="cpf"
                data-testid="checkout-cpf"
                type="text"
                id="cpf"
                onChange={ this.handleChange }
                name="cpf"
              />
            </label>
          </div>
          <div>
            <label htmlFor="phone" className="telefoneCompleto">
              Telefone
              <input
                className="telefone"
                data-testid="checkout-phone"
                type="tel"
                id="phone"
                onChange={ this.handleChange }
                name="phone"
              />
            </label>
          </div>
          <div>
            <label htmlFor="cep" className="cepCompleto">
              CEP
              <input
                className="cep"
                data-testid="checkout-cep"
                type="text"
                id="cep"
                onChange={ this.handleChange }
                name="cep"
              />
            </label>
          </div>
          <div>
            <label htmlFor="address" className="endereçoCompleto">
              Endereço
              <input
                className="endereço"
                data-testid="checkout-address"
                type="text"
                id="address"
                onChange={ this.handleChange }
                name="address"
              />
            </label>
          </div>
          <label htmlFor="ticket-payment">
            Boleto
            <input
              data-testid="ticket-payment"
              type="radio"
              name="paymentMethod"
              id="ticket-payment"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="visa-payment">
            Visa
            <input
              data-testid="visa-payment"
              type="radio"
              name="paymentMethod"
              id="visa-payment"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="visa-payment">
            Master
            <input
              data-testid="master-payment"
              type="radio"
              name="paymentMethod"
              id="master-payment"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="elo-payment">
            Elo
            <input
              data-testid="elo-payment"
              type="radio"
              name="paymentMethod"
              id="elo-payment"
              onChange={ this.handleChange }
            />
          </label>
          <div>
            <button
              className="buttonEnviar"
              data-testid="checkout-btn"
              type="button"
              id="paymentButton"
              onClick={ this.handleClick }
            >
              Enviar
            </button>
          </div>
          { mensagem && <p data-testid="error-msg">Campos inválidos</p>}
        </form>
      </div>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Checkout;
