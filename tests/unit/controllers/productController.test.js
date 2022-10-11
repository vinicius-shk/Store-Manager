const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { expect } = chai;

const connection = require('../../../src/models/database/connection');
const { allProductsResponse } = require('../mocks/productsMocks');
const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');

describe('Test suit for products Controller', function () {
  describe('Test "/" get query', function () {
    it('Should return correct data on sucess', async function () {
      const res = {};
      const req = {};
      res.status = sinon.stub().resolves(res);
      res.json = sinon.stub().resolves();
      sinon.stub(productsService, 'getAll').resolves({ type: null, message: [] });

      await productsController.getAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith([]);
    });
  });
  describe('Test "/:id" get query', function () {
    const expected = allProductsResponse.filter((p) => p.id === 1);
    it('Should return an instance of "object"', async function () {
      const res = {};
      const req = { params: { id: 1 } };
      res.status = sinon.stub().resolves(res);
      res.json = sinon.stub().resolves();
      sinon.stub(productsService, 'getById').resolves({ type: null, message: expected });

      await productsController.getById(req, res);

      expect(result).to.be.a('object');
    });
    it('Should return correct data on sucess', async function () {
      const res = {};
      const req = { params: { id: 1 } };
      res.status = sinon.stub().resolves(res);
      res.json = sinon.stub().resolves();
      sinon.stub(productsService, 'getById').resolves({ type: null, message: expected });

      await productsController.getById(req, res);

      expect(result).to.deep.equal(allProductsResponse[0]);
    });
  });
  afterEach(sinon.restore);
});
