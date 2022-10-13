const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { expect } = chai;

const {
  allProductsResponse,
  rightProductBody,
  productCreateResponse,
  wrongProductBody
} = require('../mocks/productsMocks');
const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');

describe('Test suit for products Controller', function () {
  describe('Test "/" get query', function () {
    it('Should return correct data on sucess', async function () {
      const res = {};
      const req = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'getAll').resolves({ type: null, message: [] });

      await productsController.getAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith([]);
    });
  });
  describe('Test "/:id" get query', function () {
    const expected = allProductsResponse.filter((p) => p.id === 1);
    it('Should return correct data on sucess', async function () {
      const res = {};
      const req = { params: { id: 1 } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'getById').resolves({ type: null, message: expected });

      await productsController.getById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(expected);
    });
    it('Should return correct data on unregistered ID', async function () {
      const res = {};
      const req = { params: { id: 4242 } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'getById').resolves({ type: 404, message: 'Product not found' });

      await productsController.getById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });
  describe('Test "/" post query', function () {
    it('Should return correct data on sucess', async function () {
      const res = {};
      const req = { body: rightProductBody };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'postProduct').resolves({ type: null, message: productCreateResponse });

      await productsController.postProduct(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(productCreateResponse);
    });
  });
  it('Should return correct error on wrong body format', async function () {
    const res = {};
    const req = { body: wrongProductBody };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'postProduct').resolves({ type: 400, message: '"name" is required' });

    await productsController.postProduct(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
  });
  afterEach(sinon.restore);
});
