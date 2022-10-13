const { expect } = require('chai');
const sinon = require('sinon');

const { productsModel } = require('../../../src/models');
const { allProductsResponse } = require('../mocks/productsMocks');
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
  });
  afterEach(sinon.restore);
});