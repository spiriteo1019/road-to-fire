import { Component, Input, ViewChild, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { MatSort } from '@angular/material';

import { ViewAsset } from '../../models/view-asset';

/**
 * Component to display a list of tradeable assets.
 * The list can be sorted by certain properties
 */
@Component({
  selector: 'app-tradeable-asset-list',
  templateUrl: './tradeable-asset-list.component.html',
  styleUrls: ['./tradeable-asset-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TradeableAssetListComponent implements OnChanges {

  @Input() assets: ViewAsset[];
  @Input() dataLoaded = true;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.assets) {
      this.sortData();
    }
  }

  /**
   * Sort the assets by the selected property
   */
  sortData() {
    if (!this.sort) {
      return;
    }

    if (!this.sort.active) {
      this.sort.active = 'description';
      this.sort.direction = 'asc';
    }

    this.assets.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'account': return compare(a.account.description, b.account.description, isAsc);
        case 'description': return compare(a.asset[this.sort.active], b.asset[this.sort.active], isAsc);
        default: return compare(a[this.sort.active], b[this.sort.active], isAsc);
      }
    });
  }

  /**
   * Used for ngFor trackBy. Returns the item's asset id
   */
  assetIdTrackFn(index: number, item: ViewAsset) {
    if (item && item.asset.id) {
      return item.asset.id;
    }
    return null;
  }
}

/** Simple sort comparator */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
