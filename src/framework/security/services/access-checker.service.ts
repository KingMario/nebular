/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Injectable } from '@angular/core';
import { NbRoleProvider } from './role.provider';
import { NbAclService } from './acl.service';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

@Injectable()
export class NbAccessChecker {

  constructor(protected roleProvider: NbRoleProvider, protected acl: NbAclService) {
  }

  isGranted(permission: string, resource: string): Observable<boolean> {
    return this.roleProvider.getRole()
      .pipe(
        map((role: string) => {
          return this.acl.can(role, permission, resource);
        }),
      );
  }
}
