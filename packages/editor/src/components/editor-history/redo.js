/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { withSelect, withDispatch } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { displayShortcut } from '@wordpress/keycodes';
import { redo as redoIcon } from '@wordpress/icons';
import { forwardRef } from '@wordpress/element';

function EditorHistoryRedo( { hasRedo, redo, innerRef, ...props } ) {
	return (
		<Button
			{ ...props }
			ref={ innerRef }
			icon={ redoIcon }
			label={ __( 'Redo' ) }
			shortcut={ displayShortcut.primaryShift( 'z' ) }
			// If there are no redo levels we don't want to actually disable this
			// button, because it will remove focus for keyboard users.
			// See: https://github.com/WordPress/gutenberg/issues/3486
			aria-disabled={ ! hasRedo }
			onClick={ hasRedo ? redo : undefined }
			className="editor-history__redo"
		/>
	);
}

const EnhancedEditorHistoryRedo = compose( [
	withSelect( ( select ) => ( {
		hasRedo: select( 'core/editor' ).hasEditorRedo(),
	} ) ),
	withDispatch( ( dispatch ) => ( {
		redo: dispatch( 'core/editor' ).redo,
	} ) ),
] )( EditorHistoryRedo );

export default forwardRef( ( props, ref ) => (
	<EnhancedEditorHistoryRedo { ...props } innerRef={ ref } />
) );
