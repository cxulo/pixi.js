const { AccessibilityManager } = require('../');
const { CanvasRenderer } = require('@pixi/canvas-renderer');
const Device = require('ismobilejs');

describe('PIXI.accessibility.AccessibilityManager', function ()
{
    it('should exist', function ()
    {
        expect(AccessibilityManager).to.be.not.undefined;
    });

    it('should create new manager', function ()
    {
        const manager = new AccessibilityManager();

        expect(manager).to.be.instanceof(AccessibilityManager);
        manager.destroy();
    });

    it('should be plugin for renderer', function ()
    {
        CanvasRenderer.registerPlugin('accessibility', AccessibilityManager);

        const renderer = new CanvasRenderer();

        expect(renderer.plugins.accessibility).to.be.instanceof(AccessibilityManager);
        renderer.destroy();
    });

    it('should remove touch hook when destroyed', function ()
    {
        const phone = Device.phone;

        Device.phone = true;
        const manager = new AccessibilityManager();
        const hookDiv = manager._hookDiv;

        expect(hookDiv).to.be.instanceof(HTMLElement);
        expect(document.body.contains(hookDiv)).to.be.true;
        manager.destroy();
        expect(document.body.contains(hookDiv)).to.be.false;
        Device.phone = phone;
    });
});
