const { expect } = require('chai');
const sinon = require('sinon');

const { productsModel } = require('../../../src/models');
const { allProductsResponse } = require('../mocks/productsMocks');
const { productsService } = require('../../../src/services');


describe('Test suit for products Services', function () {
  describe('Test "/" get query', function () {
    it('Should return an instance of "array"', async function () {
      sinon.stub(productsModel, 'getAll').resolves([allProductsResponse]);

      const result = await productsService.getAll();

      expect(result).to.be.a('array');
    });
    it('Should return correct data on sucess', async function () {
      sinon.stub(productsModel, 'getAll').resolves([allProductsResponse]);

      const [result] = await productsService.getAll();

      expect(result).to.deep.equal(allProductsResponse);
    });
  });
  describe('Test "/:id" get query', function () {
    const expected = allProductsResponse.filter((p) => p.id === 1);
    it('Should return an instance of "array"', async function () {
      sinon.stub(productsModel, 'getById').resolves([expected]);

      const result = await productsService.getById(1);
      expect(result).to.be.a('array');
    });
    it('Should return correct data on sucess', async function () {
      sinon.stub(productsModel, 'getById').resolves([expected]);
      const [[result]] = await productsService.getById(1);

      expect(result).to.deep.equal(allProductsResponse[0]);
    });
  });
  afterEach(sinon.restore);
});