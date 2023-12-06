describe('CHAI', () => {
    it('1. EXPECT style', () => {
      const valor = 42;
      expect(valor).to.be.a('number') //chai with expect
      expect(21 * 2).to.equal(valor)
      expect([1, 2, 3]).to.have.length(3)
      expect({number: 42}).to.have.property('number')
  
      expect({a: 1}).to.include.any.keys('a', 'b');
      expect({a: 1}).to.have.any.keys('a', 'b');
  
      const beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };
      expect(beverages).to.have.property('tea').with.lengthOf(3);
    })
  
    it('2. SHOULD style', () => {
      const foo = 'bar'
      const value = 42
      const beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };
  
      cy.wrap(value).should('be.within', 40, 43)
      cy.wrap(foo).should('be.a', 'string').and('eq', 'bar');
      cy.wrap(value).should('be.a', 'number').and('equal', 42);
      cy.wrap(beverages).should('deep.equal', {tea: [ 'chai', 'matcha', 'oolong' ]})
      cy.wrap(beverages).should('have.property', 'tea').and('have.length', 3)
        .and('have.length.at.most', 4)
    })
  
    it('3. ASSERT style', () => {
      assert.isOk(true, 'this will pass')
      assert(Array.isArray([]), 'empty arrays are arrays')
      assert.equal(3, 3, 'these numbers are equals')
      assert.notEqual(3, 4, 'these numbers are not equals')
      assert.deepEqual([{ tea: 'green', x: [] }, 4], [{ tea: 'green', x: [] }, 4]);
      assert.notDeepEqual([{ tea: 'green', x: [] }, 4], [{ tea: 'green', x: [{x:[]}] }, 4]);
    })
  })
  
  describe('Utilities', () => {
    const {$, _} = Cypress
    // com testes assíncronos passamos a callback done como argumento e chamamos done() por último
    it ('promises', (done) => {
      return new Cypress.Promise(function(resolve, reject) {
        setTimeout(() => {
          console.log('write to console')
          let x = true
          expect(x).to.be.true
          resolve(x)
        }, 1000)
  
        done()
      })
    })
  
    it('JQuery, Lodash', () => {
      assert.exists($)
      assert.exists(_)
      assert.isNotNull($)
      assert.isNotNull(_)
    })
  })
  
  describe('SINON PURE', () => {
  
    it ('SPY on object', () => {
      const sinon = Cypress.sinon
      var book = {
        pages: 42,
        author: "fulano",
        publish() {
  
        }
      };
      var spy = sinon.spy(book, 'publish');
      book.publish()
  
      sinon.assert.called(spy)
      sinon.assert.calledOnce(spy)
      sinon.assert.notCalled(sinon.spy())
    })
  
  })
  
  describe('SINON/SINON-CHAI FROM CYPRESS', () => {
  
    it ('SPY on object', () => {
      const obj = {
        foo () {},
      }
  
      const spy = cy.spy(obj, 'foo').as('fooAlias')
  
      obj.foo()
      obj.foo()
  
      cy.get('@fooAlias').should('have.been.called').and('have.been.calledTwice')
    })
  })
