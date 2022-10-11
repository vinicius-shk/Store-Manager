const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/database/connection');
const { allProductsResponse } = require('../mocks/productsMocks');
const { productsModel } = require('../../../src/models');

describe('Test suit for products', function () {
  describe('Test "/" get query', function () { 
    it('Should return an instance of "array"', async function () {
      sinon.stub(connection, 'execute').resolves([allProductsResponse]);

      const result = await productsModel.getAll();
      expect(result).to.be.a('array');
    });
    it('Should return correct data on sucess', async function () {
      sinon.stub(connection, 'execute').resolves([allProductsResponse]);

      const result = await productsModel.getAll();

      expect(result).to.deep.equal(allProductsResponse);
    });
  });
  describe('Test "/:id" get query', function () {
    const expected = allProductsResponse.filter((p) => p.id === 1);
    it('Should return an instance of "object"', async function () {
      sinon.stub(connection, 'execute').resolves([expected]);

      const result = await productsModel.getById(1);

      expect(result).to.be.a('object');
    });
    it('Should return correct data on sucess', async function () {
      sinon.stub(connection, 'execute').resolves([expected]);

      const result = await productsModel.getById(1);

      expect(result).to.deep.equal(allProductsResponse[0]);
    });
  });
  afterEach(sinon.restore);
});
