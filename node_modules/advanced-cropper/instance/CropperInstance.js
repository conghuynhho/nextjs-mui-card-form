import { __extends } from 'tslib';
import { emptyInteractions } from '../service/interactions.js';
import { AbstractCropper } from './AbstractCropper.js';

var CropperInstance = /** @class */ (function (_super) {
    __extends(CropperInstance, _super);
    function CropperInstance(props) {
        var _this = _super.call(this) || this;
        _this.props = props;
        if (!_this.isControlled()) {
            _this.data = {
                state: null,
                transitions: false,
                interactions: emptyInteractions(),
            };
        }
        return _this;
    }
    CropperInstance.prototype.isControlled = function () {
        return Boolean(this.props.getData);
    };
    CropperInstance.prototype.setData = function (data) {
        var _a, _b;
        if (!this.isControlled()) {
            this.data = data;
        }
        (_b = (_a = this.props).setData) === null || _b === void 0 ? void 0 : _b.call(_a, data);
    };
    CropperInstance.prototype.getProps = function () {
        return this.props.getProps();
    };
    CropperInstance.prototype.getData = function () {
        var _a, _b;
        return (this.isControlled() ? (_b = (_a = this.props).getData) === null || _b === void 0 ? void 0 : _b.call(_a) : this.data);
    };
    return CropperInstance;
}(AbstractCropper));

export { CropperInstance };
