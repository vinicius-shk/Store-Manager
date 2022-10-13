const { expect } = require('chai');
const sinon = require('sinon');

const { productsModel } = require('../../../src/models');
const {
  allProductsResponse,
  productCreateResponse,
  rightProductBody,
  wrongProductBody,
  wrongSizeProductBody
  } = require('../mocks/productsMocks');
const { productsService } = require('../../../src/services');


describe('Test suit for products Services', function () {
  describe('Test "/" get query', function () {
    it('Should return an instance of "array"', async function () {
      sinon.stub(productsModel, 'getAll').resolves([allProductsResponse]);

      const { message } = await productsService.getAll();
      const [expected] = message;

      expect(expected).to.be.a('array');
    });
    it('Should return correct data on sucess', async function () {
      sinon.stub(productsModel, 'getAll').resolves([allProductsResponse]);

      const { message } = await productsService.getAll();
      const [expected] = message;

      expect(expected).to.deep.equal(allProductsResponse);
    });
  });
  describe('Test "/:id" get query', function () {
    const mockValue = allProductsResponse.filter((p) => p.id === 1);
    it('Should return an instance of "array"', async function () {
      sinon.stub(productsModel, 'getById').resolves([mockValue]);

      const { message } = await productsService.getById(1);
      const [expected] = message;

      expect(expected).to.be.a('array');
    });
    it('Should return correct data on sucess', async function () {
      sinon.stub(productsModel, 'getById').resolves([mockValue]);
      
      const { message } = await productsService.getById(1);
      const [[expected]] = message;

      expect(expected).to.deep.equal(allProductsResponse[0]);
    });
    it('Should return corret error on unregistered ID', async function () {
      sinon.stub(productsModel, 'getById').resolves(undefined);

      const { message, type } = await productsService.getById(424242);

      expect(type).to.equal(404);
      expect(message).to.be.equal('Product not found');
    });
  });
  describe('Test "/" post query', function () {
    it('Should return correct data on sucess', async function () {
      sinon.stub(productsModel, 'postProduct').resolves([productCreateResponse]);

      const { message } = await productsService.postProduct(rightProductBody);
      const [expected] = message;

      expect(expected).to.deep.equal(productCreateResponse);
    });
    it('Should return correct error on wrong body request', async function () {

      const { message ,type } = await productsService.postProduct(wrongProductBody);
      const expected = message;

      expect(type).to.equal(400);
      expect(expected).to.be.equal('"name" is required');
    });
    it('Should return correct error on wrong name size request', async function () {

      const { message, type } = await productsService.postProduct(wrongSizeProductBody);
      const expected = message;

      expect(type).to.equal(422);
      expect(expected).to.be.equal('"name" length must be at least 5 characters long');
    });
  });
  afterEach(sinon.restore);
});